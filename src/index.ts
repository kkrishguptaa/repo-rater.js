import { GetActivity } from "./schemas/activity";
import { GetLeaderboard } from "./schemas/leaderboard";
import { GetPopular } from "./schemas/popular";
import { GetRepos } from "./schemas/repos";
import { GetStats } from "./schemas/stats";

interface ApiEndpoints {
  popular: {
    GET: {
      response: GetPopular;
      params: undefined
      options: undefined;
    };
  };
  leaderboard: {
    GET: {
      response: GetLeaderboard;
      params: undefined
      options: undefined;
    };
  }
  repos: {
    GET: {
      response: GetRepos;
      params?: {
        minimumVotes?: `${number}`;
        keyword?: string;
        sort?: ("rated" | "popular" | "stars")
      };
      options: undefined;
    };
  }
  stats: {
    GET: {
      response: GetStats,
      params: undefined,
      options: undefined
    }
  }
  activity: {
    GET: {
      response: GetActivity,
      params: undefined,
      options: undefined
    }
  }
}

type ApiEndpoint = keyof ApiEndpoints;
type ApiMethod = keyof ApiEndpoints[ApiEndpoint];

interface FetchOptions extends RequestInit {
  apiUrl?: string;
}

async function repoRater<E extends ApiEndpoint, M extends ApiMethod>(
  endpoint: `${M} /${E}`,
  params: ApiEndpoints[E][M]["params"],
  options: ApiEndpoints[E][M]["options"],
  fetchOptions: FetchOptions = { apiUrl: "https://repo-rater.eddiehub.io/api" }
): Promise<ApiEndpoints[E][M]["response"]> {
  const url = new URL(`${fetchOptions.apiUrl}${endpoint.split(" ")[1]}`);

  const searchParams = params as {
    [key: string]: string;
  };

  if (searchParams !== undefined) {
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] !== undefined) {
        url.searchParams.append(key, searchParams[key]);
      }
    });
  }

  return await fetch(url, {
    method: endpoint.split(" ")[0],
    body: options ? JSON.stringify(options) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
    ...fetchOptions,
  }).then(async (res) => await res.json());
}

export default repoRater;
