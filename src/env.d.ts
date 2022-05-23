declare namespace NodeJS {
  export interface ProcessEnv {
    // string(development | staging | test | production), example: development
    NODE_ENV: "development" | "staging" | "test" | "production";

    // string(numeric), example: 50001
    PORT: string;

    // string, example: graphql-starter
    API_NAME: string;

    // string, example: 0obL7KelLTFWHzwH1mHdCumP94ubvPdmJsHtw7r5QmAY
    API_TOKEN: string;

    // string(* | https://example.com,https://www.example.com), example: *
    API_CORS_ORIGINS: string;

    // string, example: registry.example.com/graphql-starter
    DOCKER_IMAGE: string;

    // string(en_US.UTF-8 | pt_BR.UTF-8 | ...), example: en_US.UTF-8
    LANG: string;

    // string(UTC | America/Sao_Paulo | America/Chicago | ...), example: UTC
    TZ?: string;
  }
}
