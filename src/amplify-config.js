export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "amplify-react-starter-upload"
  },
  api: {
    name: "amplify-react-starter",
    gateway: {
      REGION: "us-east-1",
      URL: "https://s4tkuix1ac.execute-api.us-east-1.amazonaws.com/dev"
    }
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_MFZEa6w2N",
    APP_CLIENT_ID: "u0kl5d36mvmbkkv7hkgm8g6qc",
    IDENTITY_POOL_ID: "us-east-1:febc91f1-be95-47aa-9536-d00d85ef5bab"
  }
};
