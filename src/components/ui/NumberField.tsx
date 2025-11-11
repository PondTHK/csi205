type Props = { label: string; value: number; onChange: (v:number)=>void };
export default function NumberField({ label, value, onChange }: Props) {
  return (
    <label style={{display:"grid", gap:4}}>
      <span>{label}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e)=>onChange(Number(e.target.value))}
        style={{padding:"8px 10px", border:"1px solid #e5e7eb", borderRadius:8}}
      />
    </label>
  );
}
