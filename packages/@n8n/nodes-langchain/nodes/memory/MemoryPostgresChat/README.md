# Postgres Chat Memory Timestamp

This directory contains an optional SQL snippet for extending the default `n8n_chat_histories` table. A timestamp column and trigger can be created manually with `add_timestamp.sql`, but the node also performs this setup automatically when used.

### Usage

The node ensures messages include the timestamp in `response_metadata.timestamp` and are saved with a `created_at` column. Running the SQL script is only necessary if you prefer to apply the changes ahead of time.

If you need to access the `created_at` column directly you can query it in your own code or SQL client.
