
export default function deleteLastSpace(sTr) {

  if (typeof sTr !== "string") {
    return sTr
  }

  do {
    sTr = sTr.slice(0, -1)
  } while (sTr.endsWith(" "));

  return sTr
}
