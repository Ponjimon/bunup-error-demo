// src/lambda-function.ts
import {
  NodejsFunction,
  OutputFormat
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

class LambdaFunction extends Construct {
  nodejsFunction;
  constructor(scope, id, props) {
    super(scope, id);
    const { bundling, ...nodejsFunctionProps } = props;
    this.nodejsFunction = new NodejsFunction(this, "NodejsFunction", {
      ...nodejsFunctionProps,
      bundling: {
        banner: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
        minify: true,
        format: OutputFormat.ESM,
        tsconfig: bundling?.tsconfig,
        sourceMap: true,
        mainFields: ["module", "main"],
        externalModules: ["@aws-sdk/client-s3", "aws-lambda", ...bundling?.externalModules ?? []]
      }
    });
  }
}
export {
  LambdaFunction
};
