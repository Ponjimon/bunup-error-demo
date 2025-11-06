import {
  type BundlingOptions,
  NodejsFunction,
  type NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

type CustomNodejsFunctionProps = Omit<NodejsFunctionProps, 'bundling'> & {
  bundling?: Pick<BundlingOptions, 'tsconfig' | 'externalModules'>;
};

export interface LambdaFunctionProps extends CustomNodejsFunctionProps {}

export class LambdaFunction extends Construct {
  public readonly nodejsFunction: NodejsFunction;
  constructor(scope: Construct, id: string, props: LambdaFunctionProps) {
    super(scope, id);

    const { bundling, ...nodejsFunctionProps } = props;

    this.nodejsFunction = new NodejsFunction(this, 'NodejsFunction', {
      ...nodejsFunctionProps,
      bundling: {
        banner: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
        minify: true,
        format: OutputFormat.ESM,
        tsconfig: bundling?.tsconfig,
        sourceMap: true,
        mainFields: ['module', 'main'],
        externalModules: ['@aws-sdk/client-s3', 'aws-lambda', ...(bundling?.externalModules ?? [])],
      },
    });
  }
}
