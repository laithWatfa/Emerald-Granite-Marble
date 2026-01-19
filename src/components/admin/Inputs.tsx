function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-neutral-600">{label}</label>
      <input
        {...props}
        className="input w-full  text-sm outline-none"
      />
    </div>
  )
}

function Textarea({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-neutral-600">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full input text-sm outline-none"
      />
    </div>
  )
}

function Select({ label, options, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-neutral-600">{label}</label>
      <select
        {...props}
        className="w-full input text-sm outline-none"
      >
        {options.map((o: any) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export {Input , Textarea , Select}