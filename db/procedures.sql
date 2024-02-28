CREATE OR REPLACE FUNCTION get_competition_submission_information(school_affil text)
RETURNS TABLE(url_link text, username text, posted_date timestamp) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    file_uploads.file_url, 
    users.username,
    file_uploads.time as posted_date
  FROM 
    competition
    JOIN submission ON competition.id = submission.competition_id
    JOIN users ON submission.user_id = users.id
    JOIN file_uploads ON submission.id = file_uploads.submission_id
  WHERE 
    users.school_affiliation = school_affil;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_file_upload(
    _submission_id UUID,
    _time TIMESTAMP WITHOUT TIME ZONE,
    _used BOOLEAN,
    _metadata TEXT,
    _file_url TEXT,
    _mockup_image_url TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO file_uploads (
        submission_id, 
        time, 
        used, 
        metadata, 
        file_url, 
        mockup_image_url
    )
    VALUES (
        _submission_id, 
        _time, 
        _used, 
        _metadata, 
        _file_url, 
        _mockup_image_url
    );
    -- No RETURNING clause needed since we're not returning anything
    -- No variable or RETURN statement needed since the function returns VOID
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION insert_submission(
    _competition_id UUID,
    _user_id UUID,
    _description TEXT,
    _mockup_type public.mockup_type,
    _approved BOOLEAN,
    _mockup_color TEXT
) RETURNS UUID AS $$
DECLARE
    _submission_id UUID;
BEGIN
    INSERT INTO submission (
        competition_id, user_id, description, mockup_type, approved, mockup_color
    )
    VALUES (
        _competition_id,
        _user_id,
        _description,
        _mockup_type,
        _approved,
        _mockup_color
    )
    RETURNING id INTO _submission_id;

    RETURN _submission_id;
END;
$$ LANGUAGE plpgsql;


