async function getProteinName(peptide: string) {
  if (peptide.length < 100) return null;

  const url = 'https://search.rcsb.org/rcsbsearch/v2/query';

  const json = {
    query: {
      type: 'terminal',
      service: 'sequence',
      parameters: {
        evalue_cutoff: 1,
        identity_cutoff: 0.5,
        sequence_type: 'protein',
        value: peptide,
      },
    },
    request_options: {
      scoring_strategy: 'sequence',
    },
    return_type: 'polymer_entity',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(json),
  });

  // returns protein if found
  if (response.status === 200) {
    const data = await response.json();

    return data.result_set[0].identifier.substring(0, 4);
  }

  return null;
}

export default getProteinName;
