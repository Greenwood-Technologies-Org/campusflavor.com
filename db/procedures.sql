CREATE OR REPLACE FUNCTION get_competition_submission_information(school_affil text)
RETURNS TABLE(url_link text, username text, posted_date timestamp, submission_id uuid, rank bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    fu.mockup_image_url,
    (u.raw_user_meta_data ->> 'username') AS username,
    fu.time as posted_date,
    fu.submission_id,
    ROW_NUMBER() OVER (ORDER BY count(cv.id) DESC) as rank
  FROM
    competition c
    JOIN submission s ON c.id = s.competition_id
    JOIN auth.users u ON s.user_id = u.id
    JOIN file_uploads fu ON s.id = fu.submission_id
    LEFT JOIN casted_votes cv ON fu.submission_id = cv.submission_id
  WHERE
    c.school_affiliation = school_affil AND
    s.approved = true
  GROUP BY fu.mockup_image_url, username, posted_date, fu.submission_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_competition_dates(school_affil text)
RETURNS TABLE(
    submission_start timestamp,
    submission_end timestamp,
    voting_start timestamp,
    voting_end timestamp
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    competition.submission_start_date, 
    competition.submission_end_date,
    competition.voting_start_date,
    competition.voting_end_date
  FROM 
    competition
  WHERE 
    competition.school_affiliation = school_affil;
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
    _approval_status public.approval_status,
    _mockup_color TEXT
) RETURNS UUID AS $$
DECLARE
    _submission_id UUID;
BEGIN
    INSERT INTO submission (
        competition_id, user_id, description, mockup_type, approval_status, mockup_color
    )
    VALUES (
        _competition_id,
        _user_id,
        _description,
        _mockup_type,
        _approval_status,
        _mockup_color
    )
    RETURNING id INTO _submission_id;

    RETURN _submission_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_vote_record(
    _user_id UUID, 
    _submission_id UUID, 
    _vote_value INT DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO casted_votes (user_id, submission_id, value)
    VALUES (_user_id, _submission_id, _vote_value);
END;
$$;

CREATE OR REPLACE FUNCTION insert_or_delete_vote_record(
    _user_id UUID, 
    _submission_id UUID, 
    _vote_value INT DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if a vote already exists
    IF EXISTS (SELECT 1 FROM casted_votes WHERE user_id = _user_id AND submission_id = _submission_id) THEN
        -- If a vote exists, delete it
        DELETE FROM casted_votes WHERE user_id = _user_id AND submission_id = _submission_id;
    ELSE
        -- If no vote exists, insert the new vote
        INSERT INTO casted_votes (user_id, submission_id, value)
        VALUES (_user_id, _submission_id, _vote_value);
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION get_submission_count(_submission_id UUID)
RETURNS INTEGER AS $$
DECLARE
    row_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO row_count
    FROM casted_votes
    WHERE submission_id = _submission_id;

    RETURN row_count;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION check_user_submission_exists(
    _user_id UUID,
    _submission_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM casted_votes -- replace with your actual table name
        WHERE user_id = _user_id
          AND submission_id = _submission_id
    ) INTO exists;

    RETURN exists;
END;
$$ LANGUAGE plpgsql;
