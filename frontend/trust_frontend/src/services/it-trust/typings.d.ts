declare namespace API {
  type BaseResponseListHIBPBreachDTO_ = {
    code?: number;
    data?: HIBPBreachDTO[];
    message?: string;
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
