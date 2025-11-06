import { BundlingOptions, NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nod";
import { Construct } from "constructs";
type CustomNodejsFunctionProps = Omit<NodejsFunctionProps, "bundling"> & {
	bundling?: Pick<BundlingOptions, "tsconfig" | "externalModules">;
};
interface LambdaFunctionProps extends CustomNodejsFunctionProps {}
declare class LambdaFunction extends Construct {
	readonly nodejsFunction: NodejsFunction;
	constructor(scope: Construct, id: string, props: LambdaFunctionProps);
}
export { LambdaFunctionProps, LambdaFunction };
