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



