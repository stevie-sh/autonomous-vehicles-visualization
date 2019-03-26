/**
 * An optimization for charting large datasets.
 */
const downsample = (sample,size) => {
    var chunks = [];

    // Chunk up the sample
    while (sample.length > 0) {
        chunks.push(sample.splice(0, size));
    }

    const newSample = [];
    // Process each chunk, and downsample
    for (let chunk in chunks) {

        var val = [];
        for (let i in chunks[chunk]) {
            val.push(chunks[chunk][i]["y"]);
        }

        newSample.push({
            x: chunks[chunk][Math.floor(chunks[chunk].length/2)]["x"],
            y: math.mean(val)
        });
    }

    return newSample;
}

export default downsample;
