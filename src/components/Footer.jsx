export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 px-4 text-center sm:text-left text-xs sm:text-sm text-gray-600">
        <p className="font-semibold text-gray-800">
          🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}