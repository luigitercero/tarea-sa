#! bash
git clone $REPO repo
node createZip.js
zip -r repo.zip repo
node index.js 
