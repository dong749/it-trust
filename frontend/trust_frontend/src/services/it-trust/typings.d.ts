declare namespace API {
  type BaseResponseListBreachLogVO_ = {
    code?: number;
    data?: BreachLogVO[];
    message?: string;
  };

  type BaseResponseListHIBPBreachDTO_ = {
    code?: number;
    data?: HIBPBreachDTO[];
    message?: string;
  };

  type BreachLogVO = {
    count?: number;
    isBreach?: number;
  };

  type detectBreachUsingGETParams = {
    /** email */
    email: string;
  };

  type HIBPBreachDTO = {
    breachDate?: string;
    dataTypes?: string[];
    description?: string;
    domain?: string;
    logoUrl?: string;
    title?: string;
  };
}
