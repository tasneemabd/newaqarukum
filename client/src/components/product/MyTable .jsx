import React from "react"
import style from "./style.css"


const MyTable  = () => {
    return (
        <>
        <table class="table-fill">
<thead>
<tr>
<th class="text-left">المساحة </th>
<th class="text-left">مدة الإيجار

</th>
</tr>
</thead>
<tbody class="table-hover">
<tr>
<td class="text-left">الصالات</td>
<td class="text-left">عمر العقار

</td>
</tr>
<tr>
<td class="text-left">مدخل سيارة

</td>
<td class="text-left">مدخل سيارة

</td>
</tr>
<tr>
<td class="text-left">رخصة الإعلان

</td>
<td class="text-left">رخصة الإعلان

</td>
</tr>
<tr>
<td class="text-left">رقم الإعلان

</td>
<td class="text-left">اخر تحديث

</td>
</tr>
<tr>
<td class="text-left">توفر صرف صحي

</td>
<td class="text-left">توفر الماء

</td>
</tr>
</tbody>
</table>
        </>
    );
};

export default MyTable

