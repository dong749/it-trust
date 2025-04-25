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

  type BaseResponseListQuestionBody_ = {
    code?: number;
    data?: QuestionBody[];
    message?: string;
  };

  type BaseResponseListQuestionVO_ = {
    code?: number;
    data?: QuestionVO[];
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

  type getQuestionByTypeUsingGETParams = {
    /** category */
    category: string;
  };

  type HIBPBreachDTO = {
    breachDate?: string;
    dataTypes?: string[];
    description?: string;
    domain?: string;
    logoUrl?: string;
    title?: string;
  };

  type QuestionBody = {
    id?: number;
    isDelete?: number;
    questionCategory?: string;
    questionDetails?: string;
    questionType?: number;
  };

  type QuestionVO = {
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    questionDetails?: string;
    questionId?: number;
  };
}
