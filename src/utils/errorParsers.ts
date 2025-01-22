type ErrorDetail = {
    type: string;
    loc: [string, string];
    msg: string;
    input: string;
    ctx: {
        reason?: string;
        error?: object;
    };
};

export function parseErrors(errors: ErrorDetail[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    errors.forEach((error) => {
        const fieldName = error.loc[1];

        const errorMessage = error.ctx?.reason ? error.ctx.reason : error.msg;

        if (!result[fieldName]) {
            result[fieldName] = [];
        }

        result[fieldName].push(errorMessage);
    });

    return result;
}
