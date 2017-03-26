'use strict';

window.renderStatistics = function(ctx, names, times) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);

    ctx.fillStyle = 'white';
    ctx.strokeRect(100, 10, 420, 270);
    ctx.fillRect(100, 10, 420, 270);

    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'top';
    ctx.fillText('Ура! Вы победили!', 110, 20);
    ctx.fillText('Список результатов: ', 110, 40);

    var max = -1;
    var maxIndex = -1;

    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        if (time > max) {
            max = time;
            maxIndex = i;
        }
    }

    var histogramHeight = 150;
    var step = histogramHeight / max;

    var barWidth = 40;
    var indent = barWidth + 50;
    var initialX = 150;

    for (i = 0; i < times.length; i++) {
        var columnHeight = times[i] * step;
        var initialY = 80 + histogramHeight - columnHeight;

        ctx.fillStyle = (names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' +  Math.random().toFixed(1)+ ')');
        ctx.fillRect(initialX + indent * i, initialY, barWidth, columnHeight);
        ctx.fillStyle = '#000000';
        ctx.fillText(Math.round(times[i]) + '', initialX + indent * i, initialY - 20);
        ctx.fillText(names[i], initialX + indent * i, initialY + columnHeight + 5);
    }
};