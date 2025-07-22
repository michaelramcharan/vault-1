-- Insert default staking plans
INSERT INTO staking_plans (id, name, daily_rate, min_stake_amount, lock_period_days, apy, is_popular, is_premium, features, description) VALUES
(
    'core',
    'Core Plan',
    1.2,
    1.0,
    15,
    43.8,
    FALSE,
    FALSE,
    '["Entry-level staking option", "Minimal lock-up requirements", "Fast turnaround", "Perfect for testing waters"]'::jsonb,
    'Short-term staking, long-term confidence. Perfect for agile portfolio movements.'
),
(
    'prime',
    'Prime Plan',
    1.8,
    10.0,
    30,
    65.7,
    TRUE,
    FALSE,
    '["Optimized yield curves", "Smart rebalancing", "Enhanced capital efficiency", "Strategic compounding"]'::jsonb,
    'Multiply your stake with optimized yield curves and automated growth.'
),
(
    'apex',
    'Apex Plan',
    2.4,
    100.0,
    60,
    87.6,
    FALSE,
    TRUE,
    '["Peak daily yield", "Advanced liquidity engine", "Aggressive compounding", "Premium-tier benefits"]'::jsonb,
    'Unlock next-level returns with smart compounding and top-tier staking mechanics.'
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    daily_rate = EXCLUDED.daily_rate,
    min_stake_amount = EXCLUDED.min_stake_amount,
    lock_period_days = EXCLUDED.lock_period_days,
    apy = EXCLUDED.apy,
    is_popular = EXCLUDED.is_popular,
    is_premium = EXCLUDED.is_premium,
    features = EXCLUDED.features,
    description = EXCLUDED.description;
