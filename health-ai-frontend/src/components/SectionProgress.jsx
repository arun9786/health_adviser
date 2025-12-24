export default function SectionProgress({
  sectionIndex,
  totalSections
}) {
  return (
    <div className="text-sm text-gray-500 mb-4">
      Section {sectionIndex + 1} of {totalSections}
    </div>
  );
}
