export const convertArrayBufferToObj = (data: ArrayBuffer) => {
  const encoder = new TextDecoder('utf-8');
  const dataString = encoder.decode(new Uint8Array(data));

  return JSON.parse(dataString);
};
