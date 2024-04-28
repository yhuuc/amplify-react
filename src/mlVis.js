async function showFeatures() {
    // get a surface to show song data
    const surface = tfvis.visor().surface({
        name: 'Audio Data Analysis',
        tab: 'Feature Extraction'
    });
    const drawArea = surface.drawArea;

    // get data
    
    // plot data
    tfvis.show.fitCallbacks()
}

// a button for user to reopen closed data visual
async function openVisor() {
    tfvis.visor()
}