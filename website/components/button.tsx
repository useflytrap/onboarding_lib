export function Button({ children, ...props }: any) {
  return (
    <button
      type={"button"}
      className="h-11 text-xs font-semibold px-6 text-gray-800 rounded-xl bg-gradient-to-b from-gray-100 to-gray-300 cursor-pointer flex items-center justify-center border border-gray-200"
      {...props}
    >
      {children}
    </button>
  )
}
