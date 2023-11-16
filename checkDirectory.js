const fs = require("fs");

const directoryPath = "public/uploads/events/";

// Check if the directory exists
fs.access(directoryPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Directory '${directoryPath}' does not exist`);
    process.exit(1); // Exit with an error code
  }

  // Check if the directory is writable
  fs.access(directoryPath, fs.constants.W_OK, (err) => {
    if (err) {
      console.error(`Directory '${directoryPath}' is not writable`);
      process.exit(1); // Exit with an error code
    }

    console.log(`Directory '${directoryPath}' exists and is writable`);
  });
});
