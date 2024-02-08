import React, { useEffect, useState } from "react"
import style from "./style.css"
import MyTable from "./MyTable ";
import RatingForm from "./RatingForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const Product = () => {

    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const handleShowPhoneNumber = () => {
        setShowPhoneNumber(true);
    };

    //     const { id } = match.params;
    //   const [ad, setAd] = useState(null);
    let { id } = useParams();

    const [ad, setAd] = useState(null);

    useEffect(() => {
        async function fetchAdDetails() {
            try {
                const response = await fetch(`http://localhost:9000/users/getAdvertisementById/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ad details. Status: ${response.status}`);
                }

                const data = await response.json();
                setAd(data);
            } catch (error) {
                console.error("Error fetching ad details:", error);
            }
        }

        fetchAdDetails();
    }, [id]);
    if (!ad) {
        return <div>Loading...</div>;
    }



    return (
        <>
            <section className="h-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card custam-card">
                                {/* {Advertisement.map((ad, index) => (
  <div key={index}> */}


                                <div className="ms-3" style={{ marginTop: '30px' }} >
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="d-flex justify-content-start text-center py-1">
                                            <div>
                                                <h5>{ad.description}</h5>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
  <img
    src={ad.avatar}
    alt="image 1"
    className="w-100"
    style={{ height: '100%', objectFit: 'cover' }}
  />
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.2, 
      fontSize: '90px', 
      fontWeight: 'bold', 
      fontfamily: 'Cairo',
       color: '#b8d8b6', 
    }}
  >
   عقاركم
  </div>
</div>
</div>

                                <div className="card-body p-4 text-black">
                                    <p className="lead fw-normal mb-1"> تفاصيل</p>

                                    <div className="mb-5">
                                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                            <p className="font-italic mb-1">نقدم لكم افضل العروض العقاريه باقل الاسعار
                                                ادوار ارضيه وعلويه شغل مودرن
                                                مساحه 330 متر الدور الارضي عليه 550 الف
                                                الدور العلوي عليه 570 الف قابل للتفاوض
                                                ضمانات علي الكهرب والسباكه 25 سنه
                                                ضمانات علي العوازل والخزانات وبايكه 15 سنه عوازل حراريه ومائيه
                                                اشراف هندسي كامل وبناء علي الكود السعودي الجديد وتأمين بلديه
                                                نتعامل مع جميع البنوك لتوفير الحلول التمويليه الميسره
                                                سداد مديونيات وتوفير الدفعه المقدمه بدون فوايد
                                                جميع العروض والاسعار المناسبه لجميع الشرائح
                                                0535736454.  0549620387</p>
                                            {/* <p className="font-italic mb-1">Lives in New York</p>
                                            <p className="font-italic mb-0">Photographer</p> */}
                                        </div>
                                    </div>
                                    {/* <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">Recent photos</p>
                                        <p className="mb-0">
                                            <a href="#!" className="text-muted">
                                                Show all
                                            </a>
                                        </p>
                                    </div> */}
                                    <p className="lead fw-normal mb-1">معلومات المعلن</p>
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="d-flex justify-content-start text-center py-1">
                                            <div>
                                                <p className="mb-1 h5">  {ad.AdvertiserName}   </p>
                                                <p className="small text-muted mb-0"></p>
                                            </div>
                                        </div>
                                        <RatingForm />


                                        <div className="btn-flex">

                                            <button
                                                type="button"
                                                className="btn btn-outline-dark mt-5"
                                                data-mdb-ripple-color=""
                                                style={{ zIndex: 1 }}
                                                onClick={handleShowPhoneNumber}
                                            >
                                                إظهار رقم الجوال
                                            </button>

                                            {showPhoneNumber && (
                                                <p style={{ marginTop: '10px' }}>
                                                    رقم الجوال: {ad.AdvertiserNum}
                                                </p>
                                            )}

                                            <button
                                                type="button"
                                                className="btn btn-outline-dark mt-5"
                                                data-mdb-ripple-color=""
                                                style={{ zIndex: 1 }}
                                                onClick={() => window.location.href = 'https://wa.me/1234567890'}
                                            >
                                                مراسلة
                                            </button>

                                        </div>
                                    </div>

                                    <br />
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="d-flex justify-content-start text-center py-1">
                                        <table class="table-fill">
<thead>
<tr>
<th class="text-left">المساحة :{ad.Width}</th>
<th className="text-left">
  مدة الإيجار: {(() => {
    switch (ad.selectedPayment) {
      case 'annual':
        return 'سنوي';
      case 'monthly':
        return 'شهري';
        case 'daily':
            return 'يومي';
      // Add more cases if needed
      default:
        return ''; // Default value if none of the cases match
    }
  })()}
</th>

</tr>
</thead>
<tbody class="table-hover">
<tr>
<td class="text-left">الصالات:{ad.roomCount} غرف</td>
<td class="text-left">عمر العقار:{ad.roomCount} سنة <td/>

</td>
</tr>
<tr>
<td className="text-left">
  مدخل سيارة: {ad.inVilla ? <i className="fa-solid fa-circle-check" style={{ color: '#008d6a' }}></i> : null}
</td>

<td class="text-left"> 
مدخل سيارة: {ad.inVilla ? <i className="fa-solid fa-circle-check" style={{ color: '#008d6a' }}></i> : null}

</td>
</tr>
<tr>
<td class="text-left">رخصة الإعلان
: {ad.inVilla ? <i className="fas fa-check"></i> : null}

</td>
<td class="text-left"> توفر مكيفات
: {ad.airConditioning ? <i className="fa-solid fa-circle-check" style={{ color: '#008d6a' }}></i> : null}
</td>
</tr>
<tr>
<td class="text-left">رقم الإعلان:{ad.AdvertiserNum}
</td>
<td class="text-left"> توفر كهرباء
: {ad.electricityAvailability ? <i className="fa-solid fa-circle-check" style={{ color: '#008d6a' }}></i> : null}
</td>
</tr>
<tr>
<td class="text-left">توفر صرف صحي {}
: {ad.inVilla ? <i className="fa-solid fa-circle-check" style={{ color: '#008d6a' }}></i>: null}
</td>
<td class="text-left" >توفر الماء   
: {ad.inVilla ?   <i className="fa-solid fa-circle-check" style={{ color: '#008d6a' }}></i> : null}
</td>
</tr>
</tbody>
</table>
                                           



                                        </div>

                                    </div>

                                </div>
                                {/* </div>
                                   ))} */}

                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Product

