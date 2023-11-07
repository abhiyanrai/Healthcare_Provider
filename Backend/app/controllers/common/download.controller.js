class downloadController {

  async csvFormat(req, res) {
    const headers = [
      'salutation (mandatory)',
      'lastName (mandatory)',
      'firstName (mandatory)',
      'dob (mandatory-E.g:YYYY-MM-DD)',
      'gender (mandatory)',
      'address (optional)',
      'zipcode (optional)',
      'city (optional)',
      'contactNo (mandatory)',
      'email (optional)',
      'registrationDate (optional-E.g:YYYY-MM-DD)'
    ];

   

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

    const csvContent = [headers.join(',')];
    res.send(csvContent.join('\n'));
  }

  async csvDiagnosesFormat(req, res) {
    const headers = ['Diagnoses'];
  
    // const defaultValues = [
    //   'M54.10 HWS-BWS-LWS_ Cervical/Thoracic/Lumbar Spine Syndrome',
    //   'M62.89 Muscular Pain',
    //   'M54.99 Mid-back Pain',
    //   'M99.84 ISG-Fixation of the Sacro-iliac Joint',
    //   'R20.2  Paresthesia',
    //   'M95.5 Lateral Pelvic Tilt',
    //   'M21.79 Leg Length Difference',
    //   'M62.89  Muscle Cramping',
    //   'M62.81 Neck and shoulder pain caused by muscles', 
    //   'R51 Headaches',
    //   'M19.99 Arthrosus',
    //   'M17.9 Arthrosus of the knee joint',
    //   'M89.89 Bone pain',
    //   'M79.69 Extremity pain',
    //   'M41.99 Scoliosis',
    //   'R52.0 Acute pain - non-specific', 
    //   'M71.99 Bursitis',
    //   'M65.99 Tendon sheath inflammation',
    //   'M25.31 Shoulder instability',
    //   'M53.2  Spinal joint instability',
    //   'M79.29 Non-specific nerve pain',
    //   'M25.56 Knee pain',
    //   'M54.3 SI-Joint pain',
    //   'M54.4 Lumbar/SI-Joint pain',
    //   'T73.3 Overexertion',  
    // ];
  
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=diagnoses.csv');
  
    // const csvContent = [...headers, ...defaultValues].join('\n');
    const csvContent = headers.join('\n');
  
    res.send(csvContent);
  }
  

}

module.exports = new downloadController();







