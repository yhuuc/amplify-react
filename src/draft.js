window.tf = tf;
window.tfvis = tfvis;
tfvis.visor()

function setupListeners() {

  document.querySelector('#predict').addEventListener('click', () => {
    console.log('Predicte button clicked');
    tfvis.visor().surface({
      name: 'Audio Analysis',
      tab: 'Feature Extraction'
    })
  })

  document.querySelector('#show-prediction').addEventListener('click', () => {
    console.log('Show Prediction button clicked');
    const visorInstance = tfvis.visor();
    if (!visorInstance.isOpen()) {
      visorInstance.toggle();
    }
  })

}

document.addEventListener('DOMContentLoaded', () => {
  setupListeners();
})
