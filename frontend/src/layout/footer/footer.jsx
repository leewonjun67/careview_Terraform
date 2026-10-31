import React from "react";

export default function Footer({ year = new Date().getFullYear() }) {
  return (
    <footer className="bg-[#F9FAFB] text-[#1E2939]" role="contentinfo">
      {/* 상단 경계선 */}
      <div className="border-t border-[#D1D5DB] pb-[0.1vw]" />

      <div className="w-full px-[clamp(16px,5vw,72px)]">
        {/* 본문 영역*/}
        <div className="flex justify-center">
          <div
            className="
              w-full
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              gap-x-[clamp(24px,6vw,92px)]
              gap-y-[clamp(20px,3vw,40px)]
              py-[clamp(10px,2.5vw,46px)]
              items-start
            "
          >
            {/* 회사 정보 */}
            <div>
              <div className="text-[clamp(12px,1.0vw,30px)] pb-[clamp(12px,1.5vw,24px)] font-semibold">
                회사 정보
              </div>
              <div className="space-y-[0.7vw] text-[clamp(10px,0.9vw,24px)] leading-relaxed">
                <p>회사명: Care View Inc.</p>
                <p>대표자: 김태우</p>
                <p>사업자등록번호: 010-3722-5989</p>
                <p>주소: 충청남도 천안시 상명대학교</p>
              </div>
            </div>

            {/* 약관 및 정책 */}
            <div>
              <div className="text-[clamp(12px,1.0vw,30px)] pb-[clamp(12px,1.5vw,24px)] font-semibold">
                약관 및 정책
              </div>
              <div className="space-y-[0.7vw] text-[clamp(10px,0.9vw,24px)] leading-relaxed">
                <p>이용 약관</p>
                <p>개인정보 수집 및 이용 동의</p>
                <p>개인정보 처리방침</p>
              </div>
            </div>

            {/* 인증서 */}
            <div>
              <div className="text-[clamp(12px,1.0vw,30px)] pb-[clamp(12px,1.5vw,24px)] font-semibold">
                인증서
              </div>
              <div className="space-y-[0.7vw] text-[clamp(10px,0.9vw,24px)] leading-relaxed">
                <p>의료기기 인증서</p>
                <p>정보보호 인증서</p>
                <p>ISO 9001</p>
              </div>
            </div>

            {/* 고객 지원 */}
            <div>
              <div className="text-[clamp(12px,1.0vw,30px)] pb-[clamp(12px,1.5vw,24px)] font-semibold">
                고객 지원
              </div>
              <div className="space-y-[0.7vw] text-[clamp(10px,0.9vw,24px)] leading-relaxed">
                <p>이메일: support@careview.com</p>
                <p>전화: 1588-1234</p>
                <p>운영시간: 평일 09:00-18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t-[0.8px] border-[#1E2939] w-[86%] mx-auto mt-[clamp(2px,0.5vw,10px)]" />
        <p className="text-center text-[clamp(13px,0.8vw,15px)] pb-[0.1vw] pt-[0.5vw]">
          © {year} Care View Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
