document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var canvas = document.getElementById("canvas-arrow");
  var ctxArrow = canvas.getContext("2d");
  var middleX = canvas.width / 2;
  var middleY = canvas.height / 2;
  var radius = canvas.width / 2 - canvas.width / 10;
  var startAngleIndex = 1.0;
  var endAngleIndex = 2.0;
  var zoneLineWidth = canvas.width / 30;
  var counterClockwise = false;
  var tickWidth = canvas.width / 100;
  var tickColor = "#746845";
  var tickOffsetFromArc = canvas.width / 40;
  var centerCircleRadius = canvas.width / 20;
  var centerCircleColor = "#efe5cf";
  var centerCircleBorderWidth = canvas.width / 100;
  var arrowValueIndex = 1;
  var arrowColor = "#464646";
  var arrowWidth = canvas.width / 50;
  var digits = [0, 25, 50, 75, 100];
  var digitsColor = "#746845";
  var digitsFont = "bold 20px Tahoma";
  var digitsOffsetFromArc = canvas.width / 12;
  var zonesCount = digits.length - 1;
  var step = (endAngleIndex - startAngleIndex) / zonesCount;
  var DrawZones = function() {
          var greenZonesCount = Math.ceil(zonesCount / 2);
          var yellowZonesCount = Math.ceil((zonesCount - greenZonesCount) / 2);
          var redZonesCount = zonesCount - greenZonesCount - yellowZonesCount;
          var startAngle = (startAngleIndex - 0.02) * Math.PI;
          var endGreenAngle = (startAngleIndex + greenZonesCount * step) * Math.PI;
          var endYellowAngle = (startAngleIndex + (greenZonesCount + yellowZonesCount) * step) * Math.PI;
          var endRedAngle = (endAngleIndex + 0.02) * Math.PI;
          var sectionOptions = [
              {
                  startAngle: startAngle,
                  endAngle: endGreenAngle,
                  color: "#090"
              },
              {
                  startAngle: endGreenAngle,
                  endAngle: endYellowAngle,
                  color: "#cc0"
              },
              {
                  startAngle: endYellowAngle,
                  endAngle: endRedAngle,
                  color: "#900"
              }
          ];
          this.DrawZone = function(options) {
              ctx.beginPath();
              ctx.arc(middleX, middleY, radius, options.startAngle, options.endAngle, counterClockwise);
              ctx.lineWidth = zoneLineWidth;
              ctx.strokeStyle = options.color;
              ctx.lineCap = "butt";
              ctx.stroke();
          };
          sectionOptions.forEach(function(options) {
              DrawZone(options);
          });
      };
  var DrawTicks = function() {
          this.DrawTick = function(angle) {
              var fromX = middleX + (radius - tickOffsetFromArc) * Math.cos(angle);
              var fromY = middleY + (radius - tickOffsetFromArc) * Math.sin(angle);
              var toX = middleX + (radius + tickOffsetFromArc) * Math.cos(angle);
              var toY = middleY + (radius + tickOffsetFromArc) * Math.sin(angle);
              ctx.beginPath();
              ctx.moveTo(fromX, fromY);
              ctx.lineTo(toX, toY);
              ctx.lineWidth = tickWidth;
              ctx.lineCap = "round";
              ctx.strokeStyle = tickColor;
              ctx.stroke();
          };
          for (var i = startAngleIndex; i <= endAngleIndex; i += step) {
              var angle = i * Math.PI;
              this.DrawTick(angle);
          }
      };
  var DrawDigits = function() {
          var angleIndex = startAngleIndex;
          digits.forEach(function(digit) {
              var angle = angleIndex * Math.PI;
              angleIndex += step;
              var x = middleX + (radius - digitsOffsetFromArc) * Math.cos(angle);
              var y = middleY + (radius - digitsOffsetFromArc) * Math.sin(angle);
              ctx.font = digitsFont;
              ctx.fillStyle = digitsColor;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(digit, x, y);
          });
      };
  var DrawArrow = function() {
    ctxArrow.clearRect(0, 0, 300, 300);
          var arrowAngle = ((parseInt(document.getElementById('speed').value) +100) / 100) * Math.PI;
          var toX = middleX + (radius) * Math.cos(arrowAngle);
          var toY = middleY + (radius) * Math.sin(arrowAngle);
          ctxArrow.beginPath();
          ctxArrow.moveTo(middleX, middleY);
          ctxArrow.lineTo(toX, toY);
          ctxArrow.strokeStyle = arrowColor;
          ctxArrow.lineWidth = arrowWidth;
          ctxArrow.stroke();
          ctxArrow.beginPath();
      };
      var DrawCenterCircle = function() {
          ctx.beginPath();
          ctx.arc(middleX, middleY, centerCircleRadius, 0, 2 * Math.PI, false);
          ctx.fillStyle = centerCircleColor;
          ctx.fill();
          ctx.lineWidth = centerCircleBorderWidth;
          ctx.strokeStyle = arrowColor;
          ctx.stroke();
      };
  DrawTicks();
  DrawZones();
  DrawDigits();
  DrawArrow();
  DrawCenterCircle();
  setInterval(DrawArrow, 1000);
})
