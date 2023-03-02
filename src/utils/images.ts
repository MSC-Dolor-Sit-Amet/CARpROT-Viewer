function getPeptideImage(peptide: string): string {
  // insert ',' between every letter
  const sequence = peptide.split('').join(',');

  const source = `https://pepdraw.com/cgi-bin/lib/scripts/php/peptidebuilder.php?sequence=${sequence}&nterm=NH2&cterm=COOH`;

  // TODO: display the image

  return source;
}

export default getPeptideImage;
