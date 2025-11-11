import Card from "../components/ui/Card";

const assetBase = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const PROFILE_STATS = [
  { label: "รหัสนิสิต", value: "67160165" },
  { label: "ชื่อ-นามสกุล", value: "ธนกร หีบเงิน" },
  { label: "คณะ", value: "เทคโนโลยีสารสนเทศ" },
  { label: "สาขา", value: "วิทยาการคอมพิวเตอร์" },
  { label: "ชั้นปี", value: "ปี 2" },
];



const PERSONAL_NOTES = [
  {
    title: "งานอดิเรก",
    detail: "ออกกำลังกาย • เล่นเกม • ฝึกเขียนภาษาโปรแกรมใหม่ๆ",
  },
  {
    title: "อาหารที่ชอบ",
    detail: "ข้างแกงกะหรี่ญี่ปุ่น • ข้าวมันไก่ ",
  },
  {
    title: "อาชีพในฝัน",
    detail: "นักพัฒนาโปรแกรม Full-Stack หรือ นักพัฒนาเกม",
  },
];

export default function Home() {
  const profileImageSrc = `${assetBase}img/Human.png`;

  return (
    <div className="home container">
      <Card className="home-card home-card-hero shadow-lg" bodyClassName="home-hero">
        <div className="home-hero-text">
          <h2 className="home-hero-subtitle">
          สวัสดีครับ ผมชื่อ ธนกร หีบเงิน ( ปอนด์ ) ป้จุบันเรียนอยู่ชั้นปีที่ 2 สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยศรีปทุม
          </h2>
        </div>
        <div className="home-hero-photo">
          <div className="home-photo-frame">
            <img src={profileImageSrc} alt="Thanakorn Heebngern" loading="lazy" />
          </div>
        </div>
      </Card>

      <div className="home-grid">
        <Card className="home-card" bodyClassName="home-panel">
          <h3 className="home-card-title">ข้อมูลพื้นฐาน</h3>
          <div className="home-meta-grid">
            {PROFILE_STATS.map((stat) => (
              <div className="home-meta-item" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </Card>
        <Card className="home-card" bodyClassName="home-panel">
          <h3 className="home-card-title">About me</h3>
          <ul className="home-list">
            {PERSONAL_NOTES.map((topic) => (
              <li key={topic.title}>
                <strong>{topic.title}</strong>
                <p>{topic.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
