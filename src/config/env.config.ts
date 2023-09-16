export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'develop',
  port: process.env.PORT || 3000,
  http_timeout: process.env.HTTP_TIMEOUT,
  candidate_id: process.env.CANDIDATE_ID,
  megaverse_url: process.env.MEGAVERSE_URL,
  polyanets_urn: process.env.POLYANETS_URN,
  goal_urn: process.env.GOAL_URN,  
});
