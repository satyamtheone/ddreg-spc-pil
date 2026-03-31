"use client";

import { useState } from "react";
import JoditEditorField from "./JoditEditorField";

export default function DocumentEditor() {
  const [content, setContent] = useState<string>(`
    <body lang=EN-US link="#0563C1" vlink="#954F72" style='word-wrap:break-word'>

<div class=WordSection1>

<h1 style='margin-top:12.0pt'><a name="_Toc2088699"><span style='font-size:
24.0pt'>[medicine name]*</span></a><span class=Pronunciation><span
style='font-size:9.0pt;font-family:"Calibri",sans-serif'> </span></span></h1>

<div style='border:none;border-bottom:solid windowtext 1.0pt;padding:0cm 0cm 1.0pt 0cm'>

<p class=MsoNormal style='margin-top:0cm;border:none;padding:0cm'><span
lang=EN-AU style='font-size:8.0pt'>&nbsp;</span></p>

</div>

<h2 style='background:#E7E6E6'><a name="_Toc2088700"><span style='color:black'>Consumer
Medicine Information (CMI) summary</span></a></h2>

<p class=LineSeparator style='margin-top:1.0pt;margin-right:-8.6pt;margin-bottom:
0cm;margin-left:0cm;border:none'>The <a href="#_ULTIBRO_BREEZHALER_110/50*"><span
style='color:#1F3864'>full CMI</span></a><span class=MsoHyperlink><span
style='color:#1F3864;text-decoration:none'> </span></span><span
class=MsoHyperlink><span style='color:windowtext;text-decoration:none'>on the next
page </span></span>has more details. If you are worried about using this
medicine, speak to your doctor or pharmacist.</p>

<div style='border:none;border-bottom:solid windowtext 1.5pt;padding:0cm 0cm 1.0pt 0cm'>

<p class=LineSeparator><span style='font-size:6.0pt'>&nbsp;</span></p>

</div>

<p class=NormalText><span style='position:absolute;z-index:251660288;
margin-left:1px;margin-top:149px;width:14px;height:17px'><img width=14
height=17 src="data:image/gif;base64,R0lGODlhDgARAHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACH5BAEAAAAALAAAAAANABAAggAAAAAAAN/f39PT0+/v7////wECAwECAwMrWLqs1LC8yEi4OAdZdHaKt4Gdt0wlVi3ayl4NmsbN6FIkzukSIPjAnxCQAAA7" alt="▼">
</span><a name="_Why_am_I_1"></a>      
This medicine is new or being used differently. Please report side effects. See
the <a href="#_[medicine_name]*_(phonetic">full CMI</a> <span
class=MsoHyperlink><span style='color:windowtext;text-decoration:none'>for
further details. [Include if applicable]</span></span></p>

<p class=NormalText><b>WARNING</b>: Important safety information is provided in
a boxed warning in the <a href="#_[medicine_name]*_(phonetic">full CMI</a>.
Read before using this medicine. <span class=MsoHyperlink><span
style='color:windowtext;text-decoration:none'>[Include if applicable]</span></span></p>

<h3 style='margin-top:12.0pt'><a name="_Why_am_I_3"></a>1.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span
dir=LTR></span><span style='text-transform:none'>Why am I using [medicine name]?</span></h3>

<p class=NormalText>[Medicine name] contains the active ingredient [insert
active ingredient]. [Medicine name] is used to ……. </p>

<p class=NormalText style='margin-bottom:0cm'>For more information, see <span
style='color:windowtext'>Section </span><a href="#_WHY_AM_I_2">1. Why am I
using [medicine name]?</a><span style='color:#1F3864'> </span>in the full CMI.</p>

<h3 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:
17.85pt;text-indent:-17.85pt'>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span><span dir=LTR></span><span style='text-transform:none'>What should I
know before I use [medicine name]?</span></h3>

<p class=NormalText>Do not use if you have ever had an allergic reaction to [medicine]
or any of the ingredients listed at the end of the CMI. </p>

<p class=NormalText><b>Talk to your doctor if you have any other medical
conditions, take any other medicines, or are pregnant or plan to become
pregnant or are breastfeeding</b>. </p>

<p class=NormalText>For more information, see Section <a href="#_WHAT_SHOULD_I">2.
What should I know before I use [medicine name]?</a><span style='color:#1F3864'>
</span>in the full CMI.</p>

<h3 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:
17.85pt;text-indent:-17.85pt'>3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span><span dir=LTR></span><span style='text-transform:none'>What if I am
taking other medicines?</span></h3>

<p class=NormalText>Some medicines may interfere with [medicine name] and
affect how it works.</p>

<p class=NormalText>A list of these medicines is in <span lang=EN-GB>S</span>ection
<a href="#_What_if_I">3. What if I am taking other medicines?</a> in the full
CMI.</p>

<h3 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:
17.85pt;text-indent:-17.85pt'>4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span><span dir=LTR></span><span style='text-transform:none'>How do I use [medicine
name]?</span></h3>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[Insert statement regarding dosage]</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[Insert statement(s) regarding device use /
other important directions for use]</p>

<p class=NormalText>More instructions can be found in Section<span
style='color:#1F3864'> </span><a href="#_How_do_I_1">4. How do I use [medicine
name]?</a> in the full CMI.</p>

<h3 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:
17.85pt;text-indent:-17.85pt'>5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span><span dir=LTR></span><span style='text-transform:none'>What should I
know while using [medicine name]?</span></h3>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=104 valign=top style='width:77.75pt;border:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><b>Things you should do</b></p>
  </td>
  <td width=584 valign=top style='width:437.65pt;border:solid windowtext 1.0pt;
  border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBulletCxSpFirst style='margin-left:8.9pt;text-indent:-8.9pt'><span
  style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span><span dir=LTR></span>Remind any doctor, dentist or pharmacist
  [add other health professionals as appropriate] you visit that you are using [insert
  medicine].</p>
  <p class=MsoListBulletCxSpLast style='margin-left:8.9pt;text-indent:-8.9pt'><span
  style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span><span dir=LTR></span>[Insert other relevant key point(s) e.g.
  monitoring of the condition / effectiveness of medicine]</p>
  </td>
 </tr>
 <tr>
  <td width=104 valign=top style='width:77.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><b>Things you should not do</b></p>
  </td>
  <td width=584 valign=top style='width:437.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBulletCxSpFirst style='margin-left:8.9pt;text-indent:-8.9pt'><span
  style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span><span dir=LTR></span>Do not stop using this medicine suddenly
  (if relevant).</p>
  <p class=MsoListBulletCxSpLast style='margin-left:8.9pt;text-indent:-8.9pt'><span
  style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span><span dir=LTR></span>[Insert other relevant key point(s)]</p>
  </td>
 </tr>
 <tr>
  <td width=104 valign=top style='width:77.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><b>Driving or using machines</b></p>
  </td>
  <td width=584 valign=top style='width:437.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBulletCxSpFirst style='margin-left:8.9pt;text-indent:-8.9pt'><strong><span
  style='font-family:"Calibri",sans-serif;color:windowtext;font-weight:normal'>•<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></strong><span
  dir=LTR></span><strong><span style='font-family:"Calibri",sans-serif;
  font-weight:normal'>Insert relevant information regarding any warnings to
  consider before driving or operating machinery</span></strong></p>
  <p class=MsoListBulletCxSpLast style='margin-left:8.9pt;text-indent:-8.9pt'><strong><span
  style='font-family:"Calibri",sans-serif;color:windowtext;font-weight:normal'>•<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></strong><span
  dir=LTR></span>[Insert other relevant key point(s)]</p>
  </td>
 </tr>
 <tr>
  <td width=104 valign=top style='width:77.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><b>Drinking alcohol</b></p>
  </td>
  <td width=584 valign=top style='width:437.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBulletCxSpFirst style='margin-left:8.9pt;text-indent:-8.9pt'><strong><span
  style='font-family:"Calibri",sans-serif;color:windowtext;font-weight:normal'>•<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></strong><span
  dir=LTR></span><strong><span style='font-family:"Calibri",sans-serif;
  font-weight:normal'>Insert relevant statement regarding drinking alcohol
  while using the medicine</span></strong></p>
  <p class=MsoListBulletCxSpLast style='margin-left:8.9pt;text-indent:-8.9pt'><span
  style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span><span dir=LTR></span>[Insert other relevant key point(s)]</p>
  </td>
 </tr>
 <tr>
  <td width=104 valign=top style='width:77.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><b>Looking after your medicine</b></p>
  </td>
  <td width=584 valign=top style='width:437.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBullet style='margin-top:0cm;margin-right:-7.35pt;margin-bottom:
  0cm;margin-left:8.8pt;text-indent:-8.8pt'><span style='color:windowtext'>•<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
  dir=LTR></span>Insert storage details, in particular any formulation-specific
  storage details e.g. refrigerate do not freeze</p>
  <p class=MsoListBullet style='margin-top:0cm;margin-right:0cm;margin-bottom:
  2.0pt;margin-left:8.8pt;text-indent:-8.8pt'><span style='color:windowtext'>•<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
  dir=LTR></span>[Insert other relevant key point(s)]</p>
  </td>
 </tr>
</table>

<p class=NormalText style='margin-top:6.0pt'>For more information, see Section <a
href="#_WHAT_SHOULD_I_1">5. What should I know while using [insert medicine]?</a>
in the full CMI.</p>

<h3 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:
17.85pt;text-indent:-17.85pt'>6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span><span dir=LTR></span><span style='text-transform:none'>Are there any
side effects?</span></h3>

<p class=NormalText>[Include statement of common side effects, and serious side
effects in particular that need to be noted.]</p>

<p class=NormalText style='margin-top:1.0pt;margin-right:-8.6pt;margin-bottom:
0cm;margin-left:0cm'>For more information, including what to do if you have any
side effects, see Section <a href="#_ARE_THERE_ANY">6. Are there any side
effects?</a> in the full CMI.</p>

<p class=NormalText style='margin-top:1.0pt;margin-right:-8.6pt;margin-bottom:
0cm;margin-left:0cm'>&nbsp;</p>

</div>

<span class=MsoHyperlink><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
color:black;text-decoration:none'><br clear=all style='page-break-before:always'>
</span></span>

<div class=WordSection2>

<p class=NormalText><img width=38 height=45 src="data:image/gif;base64,R0lGODlhJgAtAHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACH5BAEAAAAALAAAAAAlACwAgQAAAAAAAN/f3////wJYnI+py+0Po5y02ouz3rz7D4ZiFpTmiaboo7ZuCb2yKc3vZLtUnlb8efnBLEIST5Pb2Doz5s2j+0SlPVE1tBoNaNrtsBvoisfksvmM3gAE6zb77Y7D53JAAQA7"
align=left hspace=12 alt="▼">
<a name="_Toc2088701"></a><a
name="_ULTIBRO_BREEZHALER_110/50*"></a><a name="_TOUJEO_(too-jay-oh)"></a>This
medicine is subject to additional monitoring. This will allow quick
identification of new safety information. <br>
You can help by reporting any side effects you may get. You can report side
effects to your doctor, or directly at <a
href="http://www.tga.gov.au/reporting-problems">www.tga.gov.au/reporting-problems</a><span
class=MsoHyperlink><span style='color:#1F3864;text-decoration:none'>. </span></span><span
class=MsoHyperlink><span style='color:windowtext;text-decoration:none'>[Include
if applicable]</span></span><span style='font-size:28.0pt;color:windowtext'> </span></p>

<p class=NormalText>&nbsp;</p>

<div style='border:solid windowtext 2.25pt;padding:1.0pt 4.0pt 1.0pt 4.0pt'>

<p class=NormalText style='border:none;padding:0cm'><strong><span
style='font-family:"Calibri",sans-serif'>WARNING: [Insert boxed warning,
adapted for consumers, if applicable]</span></strong></p>

</div>

<p class=NormalText>&nbsp;</p>

<h1 style='margin-top:0cm'><a name="_[medicine_name]*_(phonetic"></a><span
style='font-size:28.0pt'>[medicine name]*</span> <span class=Pronunciation><span
style='font-size:9.0pt;font-family:"Calibri",sans-serif'>(</span></span><span
class=Pronunciation><span style='font-size:12.0pt;font-family:"Calibri",sans-serif'>phonetic
pronunciation – optional)</span></span></h1>

<p class=MsoNormal style='margin-top:6.0pt'><b><span lang=EN-AU
style='font-family:"Calibri",sans-serif'>Active ingredient(s): </span></b><i><span
lang=EN-AU style='font-family:"Calibri",sans-serif'>[medicine active
ingredient(s)]</span></i><b><span lang=EN-AU style='font-family:"Calibri",sans-serif'>
</span></b><span lang=EN-AU style='font-family:"Calibri",sans-serif'>(phonetic
pronunciation – optional)</span></p>

<div style='border:none;border-bottom:solid windowtext 1.0pt;padding:0cm 0cm 1.0pt 0cm'>

<p class=CMI align=left style='margin-top:0cm;text-align:left'><span
lang=EN-AU> </span></p>

</div>

</div>

<b><span style='font-size:11.0pt;font-family:"Calibri",sans-serif;color:black'><br
clear=all style='page-break-before:auto'>
</span></b>

<div class=WordSection3>

<p class=NormalText style='margin-top:10.0pt;background:#E7E6E6'><b><span
style='font-size:14.0pt'>Consumer Medicine Information (CMI)</span></b></p>

<p class=NormalText>This leaflet provides important information about using [medicine
name]. <strong><span style='font-family:"Calibri",sans-serif'>You should also
speak to your doctor or pharmacist if you would like further information or if
you have any concerns or questions about using [medicine name].</span></strong></p>

<p class=NormalText style='margin-top:12.0pt'><strong><span style='font-family:
"Calibri",sans-serif'>Where to find information in this leaflet:</span></strong></p>

<p class=MsoNormal style='margin-top:1.0pt;margin-right:0cm;margin-bottom:4.0pt;
margin-left:0cm'><u><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
color:#1F3864'><a href="#_WHY_AM_I">1.<span lang=EN-AU style='font-size:11.0pt'>       </span>Why
am I using [medicine name]?</a></span></u></p>

<p class=MsoNormal style='margin-top:1.0pt;margin-right:0cm;margin-bottom:4.0pt;
margin-left:0cm'><u><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
color:#1F3864'><a href="#_WHAT_SHOULD_I">2.<span lang=EN-AU style='font-size:
11.0pt'>       </span>What should I know before I use [medicine name]?</a></span></u></p>

<p class=MsoNormal style='margin-top:1.0pt;margin-right:0cm;margin-bottom:4.0pt;
margin-left:0cm'><u><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
color:#1F3864'><a href="#_WHAT_IF_I’M">3.<span lang=EN-AU style='font-size:
11.0pt'>       </span>What if I am taking other medicines?</a></span></u></p>

<p class=MsoNormal style='margin-top:1.0pt;margin-right:0cm;margin-bottom:4.0pt;
margin-left:0cm'><u><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
color:#1F3864'><a href="#_How_do_I_1">4.<span lang=EN-AU style='font-size:11.0pt'>       </span>How
do I use [medicine name]?</a></span></u></p>

<p class=MsoNormal style='margin-top:1.0pt;margin-right:0cm;margin-bottom:4.0pt;
margin-left:0cm'><u><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
color:#1F3864'><a href="#_WHAT_SHOULD_I_1">5.<span lang=EN-AU style='font-size:
11.0pt'>       </span>What should I know while using [medicine name]?</a></span></u></p>

<p class=MsoNormal style='margin-top:1.0pt;margin-right:0cm;margin-bottom:4.0pt;
margin-left:0cm'><u><span style='font-size:10.0pt;font-family:"Calibri",sans-serif;
color:#1F3864'><a href="#_ARE_THERE_ANY">6.<span lang=EN-AU style='font-size:
11.0pt'>       </span>Are there any side effects?</a></span></u></p>

<p class=MsoNormal style='margin-top:1.0pt;margin-right:0cm;margin-bottom:4.0pt;
margin-left:0cm'><a href="#_Product_details"><span style='font-size:10.0pt;
font-family:"Calibri",sans-serif'>7.</span><span lang=EN-AU style='font-size:
11.0pt;font-family:"Calibri",sans-serif'>       </span><span style='font-size:
10.0pt;font-family:"Calibri",sans-serif'>Product details</span></a></p>

<h3><a name="_Toc2150328"></a><a name="_Toc2151503"></a><a name="_WHY_AM_I"></a><span
style='text-transform:none'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span><span style='text-transform:none'>Why am I
using [medicine name]?</span></h3>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>[medicine
name] contains the active ingredient [insert active ingredient]. </span></strong>[medicine
name] is [insert therapeutic class and explanation].</p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>[medicine
name] is used to [insert indication].</span></strong></p>

<h3><a name="_Toc2088703"></a><a name="_Toc2089230"></a><a name="_Toc2150329"></a><a
name="_Toc2151504"></a><a name="_WHAT_SHOULD_I"></a>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span><span dir=LTR></span><span style='text-transform:none'>What should I
know before I use [medicine name]</span>?</h3>

<h4 style='margin-top:6.0pt'>Warnings</h4>

<h5>Do not use [medicine name] if:</h5>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>you are allergic to [active ingredient], or
any of the ingredients listed at the end of this leaflet.</p>

<p class=MsoListBulletCxSpMiddle><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>Always check the ingredients to make sure
you can use this medicine.</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[insert other relevant contraindications].</p>

<h5 style='margin-top:12.0pt'>Check with your doctor if you:</h5>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>have any other medical conditions [list any
notable ones for the medicine / medical condition here]</p>

<p class=MsoListBulletCxSpMiddle><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>take any medicines for any other condition</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[insert specific precautions relevant to the
medical condition].</p>

<p class=NormalText style='margin-bottom:6.0pt'><span style='font-size:1.0pt'>&nbsp;</span></p>

<p class=NormalText style='margin-bottom:6.0pt'>During treatment, you may be at
risk of developing certain side effects. It is important you understand these
risks and how to monitor for them. See additional information under Section <a
href="#_ARE_THERE_ANY">6. Are there any side effects?</a><span
class=MsoHyperlink> </span></p>

<h4 style='margin-top:0cm'>Pregnancy and breastfeeding</h4>

<p class=NormalText>Check with your doctor if you are pregnant or intend to
become pregnant.</p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif;
font-weight:normal'>Talk to your doctor if you are breastfeeding or intend to
breastfeed.</span></strong></p>

<p class=NormalText>[Include any other relevant pregnancy information specific
to the medicine].</p>

<h4>[Relevant condition-specific or medicine-specific subheading(s)]</h4>

<p class=MsoListBullet><span style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>This refers to any medical
condition-specific, medicine-specific, and/or age-specific subheading(s)
relevant for inclusion for certain categories/groups of users, as applicable to
the medicine.</p>

<h3><a name="_Toc2088704"></a><a name="_Toc2089231"></a><a name="_Toc2150330"></a><a
name="_Toc2151505"></a><a name="_WHAT_IF_I’M"></a><a name="_What_if_I"></a><span
style='text-transform:none'>3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span><span style='text-transform:none'>What if I
am taking other medicines?</span></h3>

<p class=NormalText style='margin-bottom:0cm'>Tell your doctor or pharmacist if
you are taking any other medicines, including any medicines, vitamins or
supplements that you buy without a prescription from your pharmacy, supermarket
or health food shop.</p>

<p class=NormalText style='margin-bottom:0cm'>&nbsp;</p>

<p class=NormalText style='margin-bottom:6.0pt'>[Options here include either: </p>

<p class=NormalText style='margin-bottom:6.0pt'>- subdividing and listing the
medicines depending on the nature of their interaction – an example of this is
included below, or; </p>

<p class=NormalText style='margin-bottom:6.0pt'>- tabulating these medicines
that have been grouped according to the nature of their interaction, or; </p>

<p class=NormalText style='margin-bottom:0cm'>- if there is only one list of
medicines, then ensuring that the information is presented consistently.]</p>

<p class=NormalText style='margin-bottom:0cm'><strong><span style='font-size:
8.0pt;font-family:"Calibri",sans-serif'>&nbsp;</span></strong></p>

<p class=NormalText style='margin-bottom:0cm'><strong><span style='font-family:
"Calibri",sans-serif'>Some medicines may interfere with [medicine name] and
affect how it works.</span></strong></p>

<p class=NormalText style='margin-bottom:0cm'><strong><span style='font-family:
"Calibri",sans-serif;font-weight:normal'>[Include an explanation of the nature
of the interaction where possible] e.g. </span></strong></p>

<p class=NormalText style='margin-bottom:0cm'><strong><span style='font-size:
8.0pt;font-family:"Calibri",sans-serif'>&nbsp;</span></strong></p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Medicines
that may </span></strong><span class=Underline>increase</span><strong><span
style='font-family:"Calibri",sans-serif'> the effect of [medicine name]
include:</span></strong></p>

<p class=MsoListBullet><span style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[list medicines as appropriate]</p>

<p class=NormalText style='margin-bottom:0cm'><strong><span style='font-size:
3.0pt;font-family:"Calibri",sans-serif;color:white;text-transform:uppercase;
font-weight:normal'>&nbsp;</span></strong></p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Medicines
that may </span></strong><span class=Underline>reduce</span><strong><span
style='font-family:"Calibri",sans-serif'> the effect of [medicine name]
include:</span></strong></p>

<p class=MsoListBullet><span style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[list medicines as appropriate]</p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Check
with your doctor or pharmacist if you are not sure about what medicines,
vitamins or supplements you are taking and if these affect [medicine name].</span></strong><a
name="_Toc2088705"></a><a name="_Toc2089232"></a><a name="_Toc2150331"></a><a
name="_Toc2151506"></a><a name="_HOW_DO_I"></a></p>

<h3><a name="_How_do_I_1"></a><span style='text-transform:none'>4.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
dir=LTR></span><span style='text-transform:none'>How do I use [medicine name]?</span><span
style='text-transform:none'> </span></h3>

<h4 style='margin-top:1.0pt'>How much to take / use</h4>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[include relevant dosage information]</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>Follow the instructions provided and use
[medicine name] until your doctor tells you to stop. [for antibiotics, replace
with ‘Follow the instructions provided when [medicine name] was prescribed,
including the number of days it should be taken.’] </p>

<h4 style='margin-top:6.0pt'>When to take / use [medicine name]</h4>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[medicine name] should be used [insert as
relevant]. </p>

<p class=MsoListBullet style='margin-top:0cm;margin-right:0cm;margin-bottom:
2.0pt;margin-left:21.3pt;text-indent:0cm'>&nbsp;</p>

<h4 style='margin-top:6.0pt'>How to [insert appropriate verb] [medicine name] (relevant
for devices)</h4>

<p class=MsoListBulletCxSpFirst style='margin-left:21.3pt;text-indent:-14.2pt'><span
style='color:windowtext;text-transform:uppercase'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[insert relevant step-by-step instructions /
considerations for device use]</p>

<p class=MsoListBulletCxSpLast style='margin-left:21.3pt;text-indent:0cm'><strong><span
style='font-size:13.0pt;color:white;text-transform:uppercase;font-weight:normal'>&nbsp;</span></strong></p>

<p class=NormalText style='margin-bottom:0cm;background:#D9E2F3'>Any external
links to further sources (e.g. instructional videos / diagrams for device use) should
be highlighted for ease of access. This will also help to distinguish external
links from internal document section links.</p>

<h4 style='margin-top:6.0pt'>If you forget to use [medicine name]</h4>

<p class=NormalText>[medicine name] should be used regularly at the same time
each day [week or month]. If you miss your dose at the usual time, [insert
appropriate explanation].</p>

<p class=NormalText><b>&nbsp;</b></p>

<p class=NormalText><b>If it is almost time for your next dose, skip the dose
you missed and take your next dose when you are meant to.</b> </p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Do
not take a double dose to make up for the dose you missed.</span></strong></p>

<p class=NormalText>&nbsp;</p>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[include explanation of what “almost time
for your next dose” refers to for the specific medicine where possible, e.g.
oral contraceptives]</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[include any other medicine-specific action
and advice about missed dose, as appropriate]</p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>&nbsp;</span></strong></p>

<h4 style='margin-top:6.0pt'>If you use too much [medicine name]</h4>

<p class=NormalText>If you think that you have used too much [medicine name], you
may need urgent medical attention.</p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>You
should immediately:</span></strong></p>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>phone the Poisons Information Centre </p>

<p class=MsoListBullet style='margin-top:0cm;margin-right:0cm;margin-bottom:
3.0pt;margin-left:21.3pt;text-indent:0cm'>(<strong><span style='font-family:
"Calibri",sans-serif'>by calling</span></strong> <strong><span
style='font-family:"Calibri",sans-serif'>13 11 26</span></strong>), or</p>

<p class=MsoListBulletCxSpMiddle><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>contact your doctor, or</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>go to the Emergency Department at your
nearest hospital.</p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>You
should do this even if there are no signs of discomfort or poisoning.         </span></strong></p>

<h3 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:
17.85pt;text-indent:-17.85pt'><a name="_Toc2088706"></a><a name="_Toc2089233"></a><a
name="_Toc2150332"></a><a name="_Toc2151507"></a><a name="_WHAT_SHOULD_I_1"></a><span
style='text-transform:none'>5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span><span style='text-transform:none'>What
should I know while using [medicine name]?</span></h3>

<h4 style='margin-top:1.0pt'><strong><span style='font-family:"Calibri",sans-serif'>Things
you should do</span></strong></h4>

<p class=MsoNormal style='margin-top:0cm;margin-right:-7.95pt;margin-bottom:
6.0pt;margin-left:0cm'><b><span style='font-size:10.0pt;font-family:"Calibri",sans-serif'>[Include
relevant action(s) and explanation(s)]</span></b></p>

<h5 style='page-break-after:avoid'>Call your doctor straight away if you:</h5>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[include relevant statements about
monitoring of the condition and relevant action(s) to be taken]</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[include relevant statement(s) about action
to be taken if the condition worsens / does not improve]</p>

<p class=NormalText style='margin-bottom:0cm'>Remind any doctor, dentist or
pharmacist [add other health professionals as appropriate] you visit that you
are using [medicine name].</p>

<h4 style='margin-top:6.0pt'>Things you should not do</h4>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>Do not stop using this medicine suddenly [if
relevant]. </p>

<p class=MsoListBulletCxSpLast><strong><span style='font-family:"Calibri",sans-serif;
color:windowtext;font-weight:normal'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></strong><span dir=LTR></span>[include any other relevant
actions(s)].</p>

<h4 style='margin-top:10.0pt'>[Relevant condition-specific or medicine-specific
subheading(s)]</h4>

<p class=MsoListBullet><span style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>Some medicines may require additional
subheading(s) relevant to monitoring the condition and actions to be taken while
on the medicine, e.g. bleeding risk with antiplatelets / hypoglycaemia and what
to do.</p>

<h4 style='margin-top:10.0pt'>Driving or using machines</h4>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Be
careful before you drive or use any machines or tools until you know how [medicine
name] affects you.</span></strong></p>

<p class=NormalText style='margin-bottom:0cm'>[medicine name] may cause
dizziness in some people </p>

<p class=NormalText style='margin-bottom:0cm'>[or insert relevant information,
as appropriate]. </p>

<p class=MsoNormal style='margin-top:0cm'><span style='font-size:9.0pt;
font-family:"Calibri",sans-serif'>&nbsp;</span></p>

<h4 style='margin-top:1.0pt'>Drinking alcohol</h4>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Tell
your doctor if you drink alcohol.</span></strong> </p>

<p class=NormalText style='margin-bottom:0cm'>Alcohol may [insert effect
relevant to use of the medicine].</p>

<h4 style='margin-top:10.0pt'>Looking after your medicine</h4>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[include device-specific storage information]</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>[include storage information]. </p>

<p class=NormalText>Follow the instructions in the carton on how to take care
of your medicine properly.</p>

<p class=NormalText>Store it in a cool dry place away from moisture, heat or
sunlight; for example, do not store it:</p>

<p class=MsoListBulletCxSpFirst><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>in the bathroom or near a sink, or</p>

<p class=MsoListBulletCxSpLast><span style='color:windowtext'>•<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span>in the car or on window sills.</p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Keep
it where young children cannot reach it.</span></strong></p>

<h4 style='margin-top:10.0pt'><strong><span style='font-family:"Calibri",sans-serif'>When
to discard your medicine (as relevant)</span></strong></h4>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>[Include
any specific information about discarding the medicine, e.g. 28 day expiry from
date of first use].</span></strong></p>

<h4 style='margin-top:10.0pt'>Getting rid of any unwanted medicine</h4>

<p class=NormalText>If you no longer need to use this medicine or it is out of
date, take it to any pharmacy for safe disposal.</p>

<p class=NormalText>Do not use this medicine after the expiry date.</p>

<h3><a name="_Toc2088707"></a><a name="_Toc2089234"></a><a name="_Toc2150333"></a><a
name="_Toc2151508"></a><a name="_ARE_THERE_ANY"></a><span style='text-transform:
none'>6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span dir=LTR></span><span style='text-transform:none'>Are there
any side effects?</span></h3>

<p class=NormalText>All medicines can have side effects. If you do experience
any side effects, most of them are minor and temporary. However, some side
effects may need medical attention. </p>

<p class=NormalText>See the information below and, if you need to, ask your
doctor or pharmacist if you have any further questions about side effects.</p>

<h4>Less serious side effects</h4>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=217 valign=top style='width:162.8pt;border:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText style='margin-top:4.0pt'><strong><span style='font-family:
  "Calibri",sans-serif'>Less serious side effects</span></strong></p>
  </td>
  <td width=103 valign=top style='width:76.95pt;border:solid windowtext 1.0pt;
  border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText style='margin-top:4.0pt'><strong><span style='font-family:
  "Calibri",sans-serif'>What to do</span></strong></p>
  </td>
 </tr>
 <tr>
  <td width=217 valign=top style='width:162.8pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBullet style='margin-top:6.0pt;margin-right:0cm;margin-bottom:
  3.0pt;margin-left:0cm;text-indent:0cm'><b>[Grouping 1 as per effect on body
  e.g. bleeding-related]:</b></p>
  <p class=MsoListBulletCxSpMiddle style='margin-left:8.2pt;text-indent:-7.1pt'><span
  style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp; </span></span><span
  dir=LTR></span>[list as appropriate]</p>
  <p class=MsoListBulletCxSpMiddle style='margin-left:17.85pt;text-indent:-17.85pt'>&nbsp;</p>
  <p class=MsoListBullet style='margin-top:0cm;margin-right:0cm;margin-bottom:
  3.0pt;margin-left:0cm;text-indent:0cm'><b>[Grouping 2 as per effect on body]:</b></p>
  <p class=MsoListBulletCxSpLast style='margin-left:8.35pt;text-indent:-8.35pt'><strong><span
  style='font-family:"Calibri",sans-serif;color:windowtext;font-weight:normal'>•<span
  style='font:7.0pt "Times New Roman"'>&nbsp; </span></span></strong><span
  dir=LTR></span>[list as appropriate]</p>
  </td>
  <td width=103 valign=top style='width:76.95pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText style='margin-top:6.0pt'><b>Speak to your doctor if you
  have any of these less serious side effects and they worry you.</b></p>
  <p class=NormalText style='margin-top:6.0pt'><b>[Insert appropriate action]</b></p>
  </td>
 </tr>
</table>

<p class=NormalText>&nbsp;</p>

<h4 style='margin-top:0cm'>Serious side effects</h4>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=217 valign=top style='width:162.8pt;border:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-top:4.0pt;margin-right:0cm;margin-bottom:
  4.0pt;margin-left:0cm'><strong><span style='font-size:10.0pt;font-family:
  "Calibri",sans-serif'>Serious side effects</span></strong></p>
  </td>
  <td width=103 valign=top style='width:76.95pt;border:solid windowtext 1.0pt;
  border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-top:4.0pt;margin-right:0cm;margin-bottom:
  4.0pt;margin-left:0cm'><strong><span style='font-size:10.0pt;font-family:
  "Calibri",sans-serif'>What to do</span></strong></p>
  </td>
 </tr>
 <tr>
  <td width=217 valign=top style='width:162.8pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBullet style='margin-top:6.0pt;margin-right:0cm;margin-bottom:
  3.0pt;margin-left:0cm;text-indent:0cm'><b>[Grouping 1 as per effect on body
  e.g. bleeding-related]:</b></p>
  <p class=MsoListBulletCxSpMiddle style='margin-left:8.2pt;text-indent:-7.1pt'><span
  style='color:windowtext'>•<span style='font:7.0pt "Times New Roman"'>&nbsp; </span></span><span
  dir=LTR></span>[list as appropriate]</p>
  <p class=MsoListBulletCxSpMiddle style='margin-left:17.85pt;text-indent:-17.85pt'>&nbsp;</p>
  <p class=MsoListBullet style='margin-top:0cm;margin-right:0cm;margin-bottom:
  3.0pt;margin-left:0cm;text-indent:0cm'><b>[Grouping 2 as per effect on body]:</b></p>
  <p class=MsoListBulletCxSpLast style='margin-left:8.35pt;text-indent:-7.1pt'><strong><span
  style='font-family:"Calibri",sans-serif;color:windowtext;font-weight:normal'>•<span
  style='font:7.0pt "Times New Roman"'> </span></span></strong><span dir=LTR></span>[list
  as appropriate]</p>
  </td>
  <td width=103 valign=top style='width:76.95pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Call
  your doctor straight away, or go straight to the Emergency Department at your
  nearest hospital if you notice any of these serious side effects.</span></strong></p>
  </td>
 </tr>
</table>

<p class=NormalText style='margin:0cm'><strong><span style='font-family:"Calibri",sans-serif'>&nbsp;</span></strong></p>

<p class=NormalText style='margin-top:0cm'><strong><span style='font-family:
"Calibri",sans-serif'>Tell your doctor or pharmacist if you notice anything
else that may be making you feel unwell.</span></strong></p>

<p class=NormalText style='margin-bottom:0cm'><strong><span style='font-family:
"Calibri",sans-serif;font-weight:normal'>Other side effects not listed here may
occur in some people.</span></strong></p>

<h4 style='margin-top:6.0pt'>Reporting side effects</h4>

<p class=NormalText style='margin-bottom:2.0pt'>After you have received medical
advice for any side effects you experience, you can report side effects to the
Therapeutic Goods Administration online at <a
href="http://www.tga.gov.au/reporting-problems">www.tga.gov.au/reporting-problems</a>.
By reporting side effects, you can help provide more information on the safety
of this medicine.<a name="_Toc2088708"></a><a name="_Toc2089235"></a><a
name="_Toc2151509"></a></p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Always
make sure you speak to your doctor or pharmacist before</span></strong><b> you
decide to stop taking any of your medicines.</b></p>

<h3><a name="_Product_details"></a><span style='text-transform:none'>7.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
dir=LTR></span><span style='text-transform:none'>Product details</span></h3>

<p class=NormalText>This medicine is only available with a doctor's
prescription.</p>

<h4>What [medicine name] contains</h4>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=132 valign=top style='width:99.0pt;border:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Active
  ingredient </span></strong></p>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>(main
  ingredient)</span></strong></p>
  </td>
  <td width=188 valign=top style='width:140.75pt;border:solid windowtext 1.0pt;
  border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoListBullet style='margin-left:17.85pt;text-indent:-17.85pt'><strong><span
  style='font-family:"Calibri",sans-serif;font-weight:normal'>[insert]</span></strong></p>
  </td>
 </tr>
 <tr>
  <td width=132 valign=top style='width:99.0pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Other
  ingredients</span></strong></p>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>(inactive
  ingredients)</span></strong></p>
  </td>
  <td width=188 valign=top style='width:140.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif;
  font-weight:normal'>[insert]</span></strong></p>
  </td>
 </tr>
 <tr>
  <td width=132 valign=top style='width:99.0pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Potential
  allergens</span></strong></p>
  </td>
  <td width=188 valign=top style='width:140.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=NormalText><strong><span style='font-family:"Calibri",sans-serif;
  font-weight:normal'>[insert]</span></strong></p>
  </td>
 </tr>
</table>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>&nbsp;</span></strong></p>

<p class=NormalText><strong><span style='font-family:"Calibri",sans-serif'>Do
not take this medicine if you are allergic to any of these ingredients.</span></strong></p>

<p class=NormalText><b>&nbsp;</b></p>

<h4>What [medicine name] looks like</h4>

<p class=NormalText>[medicine name] is… (Aust R XXXXXX). </p>

<p class=NormalText>&nbsp;</p>

<h4 style='margin-top:18.0pt'>Who distributes [medicine name]</h4>

<p class=NormalText>[insert sponsor name and contact details]</p>

<p class=NormalText>&nbsp;</p>

<p class=NormalText>This leaflet was prepared in [insert month and year].</p>

<p class=MsoNormal>&nbsp;</p>

</div>

</body>
  `);

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
