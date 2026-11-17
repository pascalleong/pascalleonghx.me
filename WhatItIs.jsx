// What It Is: the problem, the system, one apply CTA.
const WhatItIs = ({ onNav }) => (
  <>
    <ProblemSection />
    <MechanismSection />
    <CTAPanel><PLButton onClick={() => onNav('table')}>Apply For 1-on-1 With Pascal</PLButton></CTAPanel>
  </>
);

Object.assign(window, { WhatItIs });
