import forge from 'node-forge';

export const generateKeyPair = () => {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  return {
    privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
    publicKey: forge.pki.publicKeyToPem(keypair.publicKey)
  };
};

export const signDocument = (data: string, privateKey: string) => {
  const md = forge.md.sha256.create();
  md.update(data, 'utf8');
  
  const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
  return forge.util.encode64(privateKeyObj.sign(md));
};

export const verifySignature = (data: string, signature: string, publicKey: string) => {
  const md = forge.md.sha256.create();
  md.update(data, 'utf8');
  
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  try {
    return publicKeyObj.verify(
      md.digest().bytes(),
      forge.util.decode64(signature)
    );
  } catch (e) {
    return false;
  }
};