-- Add timestamp column and trigger for Postgres Chat Memory messages

ALTER TABLE n8n_chat_histories
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

CREATE OR REPLACE FUNCTION add_timestamp_to_message()
RETURNS trigger AS $$
BEGIN
  NEW.message := NEW.message::jsonb || jsonb_build_object('response_metadata', jsonb_build_object('timestamp', NOW()));
  NEW.created_at := COALESCE(NEW.created_at, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_message_with_timestamp ON n8n_chat_histories;
CREATE TRIGGER update_message_with_timestamp
BEFORE INSERT ON n8n_chat_histories
FOR EACH ROW EXECUTE FUNCTION add_timestamp_to_message();
