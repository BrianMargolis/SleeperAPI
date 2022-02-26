
  // The global limit over our calls to Sleeper API is 1000/minute, throttling
  // at 10 to be conservative. If we hit their limit, we get IP blocked... so 
  // best to play it safe
  export const MAX_TPS = 10;

  export const SLEEPER_BASE_DOMAIN = "https://api.sleeper.app/v1/";

  export const LEAGUE_WEEKS = {
    "2020": 16,
    "2021": 17
  }