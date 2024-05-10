async function showFeatures() {
  // get a surface to show song data
  const surface = tfvis.visor().surface({
    name: "Audio Data Analysis",
    tab: "Feature Extraction",
  });
  const drawArea = surface.drawArea;

  // get data

  // plot data
  tfvis.show.fitCallbacks();
}

// a button for user to reopen closed data visual
async function openVisor() {
  tfvis.visor();
}

async function train(model, data, fitCallbacks) {
  const BATCH_SIZE = 64;
  const trainDataSize = 500;
  const testDataSize = 100;
  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(trainDataSize);
    return [d.xs.reshape([trainDataSize, 28, 28, 1]), d.labels];
  });
  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(testDataSize);
    return [d.xs.reshape([testDataSize, 28, 28, 1]), d.labels];
  });
  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: 10,
    shuffle: true,
    callbacks: fitCallbacks,
  });
}

async function watchTraining() {
  const metrics = ["loss", "val_loss", "acc", "val_acc"];
  const container = {
    name: "show.fitCallbacks",
    tab: "Training",
    styles: {
      height: "1000px",
    },
  };
  const callbacks = tfvis.show.fitCallbacks(container, metrics);
  return train(model, data, callbacks);
}

document
  .querySelector("#start-training-1")
  .addEventListener("click", () => watchTraining());
