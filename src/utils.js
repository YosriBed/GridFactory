const percentColors = [
    { pct: -100, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 100, color: { r: 0x00, g: 0xff, b: 0 } } ];


export const getColorFromNumber = (pct) => {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}  

export const generateAndDownloadBlob = (blob) => {
    const csvURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "graph.png");
    tempLink.click();
}