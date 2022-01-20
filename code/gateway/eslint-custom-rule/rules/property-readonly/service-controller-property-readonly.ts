import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
const createRule = ESLintUtils.RuleCreator((name) => name);

const rule = createRule({
    name: 'service-controller-property-readonly',
    meta: {
        docs: {
            description: 'service and controller properties must be readonly',
            recommended: 'error',
            requiresTypeChecking: false,
            suggestion: true,
        },
        messages: {
            'missing-property-readonly': '"{{name}}" property must be readonly',
            'missing-property-readonly-fixed': 'add readonly for "{{name}}" property',
            'missing-param-property-readonly': 'constuctor "{{name}}" param must be readonly',
            'missing-param-property-readonly-fixed': 'add readonly for "{{name}}" param property',
        },
        type: 'problem',
        fixable: "code",
        hasSuggestions: true,
        schema: {},
    },
    defaultOptions: [],
    create: function (context) {
        //ts ast https://typescript-eslint.io/play/#ts=4.5.2&sourceType=module&showAST=es&code=KYDwDg9gTgLgBAYwDYEMDOa4BVhpgZWCgDcBLBYAbwFgAoOBuGXGAJgC48pSA7AcwDcdRogg8uAVwQxoACjDdiKZkxYBGTjG78AlJQC+dfUA
        return {
            // PropertyDefinition(node) {
            //     console.log(node);
            //     if (!node.readonly) {
            //         context.report({
            //             node: node,
            //             messageId: "missing-property-readonly",
            //         });
            //     }

            // },
            // MethodDefinition(node) {

            // },
            'ClassDeclaration[id.name=/Service/] PropertyDefinition'(
                node: TSESTree.PropertyDefinition,
            ) {
                console.log("ClassDeclaration[id.name=/Service/] PropertyDefinition");
                if (!node.readonly) {
                    context.report({
                        node: node,
                        data: { name: node.key["name"] },
                        messageId: 'missing-property-readonly',
                        fix: (fixer) => {
                            return fixer.replaceText(node.key, `readonly ${node.key["name"]}`);
                        },
                        suggest: [
                            {
                                messageId: 'missing-property-readonly-fixed',
                                data: { name: node.key["name"] },
                                fix: (fixer) => {
                                    return fixer.replaceText(node.key, `readonly ${node.key["name"]}`);
                                }
                            }
                        ]
                    });
                }
            },
            'ClassDeclaration[id.name=/Service/] MethodDefinition[kind=constructor] TSParameterProperty'(
                node: TSESTree.TSParameterProperty,
            ) {
                console.log("ClassDeclaration[id.name=/Service/] MethodDefinition[kind=constructor] TSParameterProperty");
                if (!node.readonly) {
                    context.report({
                        node: node,
                        messageId: 'missing-param-property-readonly',
                        data: { name: node.parameter["name"] },
                        suggest: [
                            {
                                messageId: 'missing-param-property-readonly-fixed',
                                data: { name: node.parameter["name"] },
                                fix: (fixer) => {
                                    return fixer.insertTextBeforeRange(node.parameter.range, `readonly `);
                                }
                            }
                        ]
                    });
                }
            },
            'ClassDeclaration[id.name=/Controller/] PropertyDefinition'(
                node: TSESTree.PropertyDefinition,
            ) {
                console.log("ClassDeclaration[id.name=/Service/] MethodDefinition[kind=constructor] TSParameterProperty");
                if (!node.readonly) {
                    context.report({
                        node: node,
                        messageId: 'missing-property-readonly',
                        data: { name: node.key["name"] },
                        suggest: [
                            {
                                messageId: 'missing-property-readonly-fixed',
                                data: { name: node.key["name"] },
                                fix: (fixer) => {
                                    return fixer.replaceText(node.key, `readonly ${node.key["name"]}`);
                                }
                            }
                        ]
                    });
                }
            },
            'ClassDeclaration[id.name=/Controller/] MethodDefinition[kind=constructor] TSParameterProperty'(
                node: TSESTree.TSParameterProperty,
            ) {
                console.log("ClassDeclaration[id.name=/Service/] MethodDefinition[kind=constructor] TSParameterProperty");
                if (!node.readonly) {
                    context.report({
                        node: node,
                        messageId: 'missing-param-property-readonly',
                        data: { name: node.parameter["name"] },
                        suggest: [
                            {
                                messageId: 'missing-param-property-readonly-fixed',
                                data: { name: node.parameter["name"] },
                                fix: (fixer) => {
                                    return fixer.insertTextBeforeRange(node.parameter.range, `readonly `);
                                }
                            }
                        ]
                    });
                }
            },
        };
    },
});
export default rule;
