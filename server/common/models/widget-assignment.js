'use strict';

module.exports = function(Widgetassignment) {
    Widgetassignment.afterRemote('**', function(ctx, Widgetassignment, next) {
        var answers = {};
        if (ctx.result) {
            if (Array.isArray(ctx.result)) {
                var positions = {},i, j, currrentElement;
                var result = ctx.result;
                for(i = 0, j = result.length; i < j; i++){
                    currrentElement = result[i];
                    if (!(currrentElement.position in positions)) {
                        positions[currrentElement.position] = { widgets: []};
                        answers[currrentElement.position] = positions[currrentElement.position];                     
                    }
                    positions[currrentElement.position].widgets.push(currrentElement);
                }
                ctx.result = answers;
            } else {
                answers.ctx.result.position = ctx.result;
            }
        }
        next();
    });
};

