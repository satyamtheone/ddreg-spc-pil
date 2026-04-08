"use client";

import { useState } from "react";
import JoditEditorField from "./JoditEditorField";

export default function DocumentEditor() {
  const [content, setContent] = useState<string>(
    `<p>Treatment with IBRANCE should be initiated and supervised by a physician experienced in the use of  anticancer medicinal products.</p><p>Posology</p><p>The recommended dose is 125 mg of palbociclib once daily for 21 consecutive days followed by  7 days off treatment (Schedule 3/1) to comprise a complete cycle of 28 days. The treatment with  IBRANCE should be continued as long as the patient is deriving clinical benefit from therapy or until  unacceptable toxicity occurs.</p><p>When coadministered with palbociclib, the aromatase inhibitor should be administered according to  the dose schedule reported in the Summary of Product Characteristics. Treatment of  pre/perimenopausal women with the combination of palbociclib plus an aromatase inhibitor should  always be combined with an LHRH agonist (see section 4.4).</p><p>When coadministered with palbociclib, the recommended dose of fulvestrant is 500 mg administered  intramuscularly on Days 1, 15, 29, and once monthly thereafter. Please refer to the Summary of  Product Characteristics of fulvestrant. Prior to the start of treatment with the combination of  palbociclib plus fulvestrant, and throughout its duration, pre/perimenopausal women should be treated  with LHRH agonists according to local clinical practice.</p><p>Patients should be encouraged to take their dose at approximately the same time each day. If the  patient vomits or misses a dose, an additional dose should not be taken that day. The next prescribed  dose should be taken at the usual time.</p><p>Dose adjustments Dose modification of IBRANCE is recommended based on individual safety and tolerability.</p><p>Management of some adverse reactions may require temporary dose interruptions/delays, and/or dose  reductions, or permanent discontinuation as per dose reduction schedules provided in Tables 1, 2, and  3 (see sections 4.4 and 4.8).</p><p>Table 1. IBRANCE recommended dose modifications for adverse reactions</p><p>Dose level Dose Recommended dose 125 mg/day First dose reduction   100 mg/day Second dose reduction   75 mg/day* *If further dose reduction below 75 mg/day is required, discontinue the treatment.</p><p>Complete blood count should be monitored prior to the start of IBRANCE therapy and at the  beginning of each cycle, as well as on Day 15 of the first 2 cycles, and as clinically indicated.</p><p>4</p><p>For patients who experience a maximum of Grade 1 or 2 neutropenia in the first 6 cycles, complete  blood counts for subsequent cycles should be monitored every 3 months, prior to the beginning of a  cycle and as clinically indicated.</p><p>Absolute neutrophil counts (ANC) of ≥1,000/mm 3  and platelet counts of ≥50,000/mm 3 are  recommended to receive IBRANCE.</p><p>Table 2. IBRANCE dose modification and management – Haematological toxicities CTCAE grade Dose modifications Grade 1 or 2 No dose adjustment is required. Grade 3 a Day 1 of cycle: Withhold IBRANCE, until recovery to Grade ≤2, and repeat complete  blood count monitoring within 1 week. When recovered to Grade ≤2,  start the next cycle at the  same dose .</p><p>Day 15 of first 2 cycles: If Grade 3 on Day 15, continue IBRANCE at the  current dose  to  complete cycle and repeat complete blood count on Day 22. If Grade 4 on Day 22, see Grade 4 dose modification guidelines  below.</p><p>Consider dose reduction in cases of prolonged (> 1 week) recovery  from Grade 3 neutropenia or recurrent Grade 3 neutropenia on Day 1  of subsequent cycles. Grade 3 ANC b (< 1,000 to 500/mm 3 )  + Fever ≥38.5 ºC  and/or infection</p><p>At any time: Withhold IBRANCE until recovery to Grade ≤2  Resume at next lower dose.</p><p>Grade 4 a At any time: Withhold IBRANCE until recovery to Grade ≤2. Resume at next lower dose. Grading according to CTCAE 4.0. ANC=absolute neutrophil counts; CTCAE=Common Terminology Criteria for Adverse Events;  LLN=lower limit of normal. a Table applies to all haematological adverse reactions except lymphopenia (unless associated with  clinical events, e.g., opportunistic infections). b ANC: Grade 1: ANC < LLN – 1,500/mm 3 ; Grade 2: ANC 1,000 - < 1,500/mm 3 ;  Grade 3: ANC 500 - < 1,000/mm 3 ; Grade 4: ANC < 500/mm 3 .</p><p>Table 3. IBRANCE dose modification and management – Non-haematological toxicities CTCAE grade Dose modifications Grade 1 or 2 No dose adjustment is required. Grade ≥3 non-haematological toxicity (if  persisting despite medical treatment) Withhold until symptoms resolve to:  Grade ≤1;  Grade ≤2 (if not considered a safety risk  for the patient) Resume at the next lower dose. Grading according to CTCAE 4.0. CTCAE=Common Terminology Criteria for Adverse Events.</p><p>IBRANCE should be permanently discontinued in patients with severe interstitial lung disease  (ILD)/pneumonitis (see section 4.4).</p><p>5</p><p>Special populations</p><p>Elderly No dose adjustment of IBRANCE is necessary in patients ≥65 years of age (see section 5.2).</p><p>Hepatic impairment No dose adjustment of IBRANCE is required for patients with mild or moderate hepatic impairment  (Child-Pugh classes A and B). For patients with severe hepatic impairment (Child-Pugh class C), the  recommended dose of IBRANCE is 75 mg once daily on Schedule 3/1 (see sections 4.4 and 5.2).</p><p>Renal impairment No dose adjustment of IBRANCE is required for patients with mild, moderate or severe renal  impairment (creatinine clearance [CrCl] ≥15 mL/min). Insufficient data are available in patients  requiring haemodialysis to provide any dose adjustment recommendation in this patient population (see sections 4.4 and 5.2).</p><p>Paediatric population There is no relevant use of IBRANCE in the paediatric population for the treatment of breast  carcinoma. The efficacy of IBRANCE in children and adolescents < 18 years of age has not been  demonstrated. Currently available data are described in sections 4.8, 5.1, and 5.2.</p><p>Method of administration</p><p>IBRANCE is for oral use. It should be taken with food, preferably a meal to ensure consistent  palbociclib exposure (see section 5.2). Palbociclib should not be taken with grapefruit or grapefruit  juice (see section 4.5).</p><p>IBRANCE capsules should be swallowed whole (should not be chewed, crushed, or opened prior to  swallowing). No capsule should be ingested if it is broken, cracked, or otherwise not intact.</p>`,
  );

  const handleSubmit = () => {
    console.log("Submitted HTML Content:");
    console.log(content);

    const response = {
      body: content,
      length: content.length,
      timestamp: new Date().toISOString(),
    };

    console.log("Mock API Response:", response);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Jodit Editor Example</h1>

      <JoditEditorField value={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}
