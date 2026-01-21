export default function Input({
  label,
  icon,
  ...props
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-cyan-400">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500">
          {icon}
        </span>

        <input
          {...props}
          className="
            w-full rounded-lg bg-[#0f172a]
            py-2.5 pl-10 pr-3
            text-cyan-100
            border border-cyan-900
            focus:border-cyan-400
            focus:outline-none
            transition
          "
        />
      </div>
    </div>
  );
}
