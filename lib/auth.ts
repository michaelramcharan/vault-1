"use client"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { DatabaseService } from "./database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  static generateToken(user: AuthUser): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )
  }

  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      return {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
      }
    } catch (error) {
      return null
    }
  }

  static async signUp(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<{ user: AuthUser; token: string } | { error: string }> {
    try {
      // Check if user already exists
      const existingUser = await DatabaseService.getUserByEmail(email)
      if (existingUser) {
        return { error: "User already exists with this email" }
      }

      // Hash password and create user
      const passwordHash = await this.hashPassword(password)
      const user = await DatabaseService.createUser(email, passwordHash, firstName, lastName)

      // Generate token
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
      const token = this.generateToken(authUser)

      return { user: authUser, token }
    } catch (error) {
      console.error("Sign up error:", error)
      return { error: "Failed to create account" }
    }
  }

  static async signIn(email: string, password: string): Promise<{ user: AuthUser; token: string } | { error: string }> {
    try {
      // Get user and password hash
      const user = await DatabaseService.getUserByEmail(email)
      if (!user) {
        return { error: "Invalid email or password" }
      }

      const passwordHash = await DatabaseService.verifyUserPassword(email)
      if (!passwordHash) {
        return { error: "Invalid email or password" }
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, passwordHash)
      if (!isValidPassword) {
        return { error: "Invalid email or password" }
      }

      // Generate token
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
      const token = this.generateToken(authUser)

      return { user: authUser, token }
    } catch (error) {
      console.error("Sign in error:", error)
      return { error: "Failed to sign in" }
    }
  }

  static async getCurrentUser(token: string): Promise<AuthUser | null> {
    const decoded = this.verifyToken(token)
    if (!decoded) return null

    // Verify user still exists and is active
    const user = await DatabaseService.getUserById(decoded.id)
    if (!user || !user.isActive) return null

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  }
}
