import Badge from "../components/Badge";
import Section from "../components/Section";
import ListBlock from "../components/ListBlock";
import BmiProgressBar from "../components/BmiProgressBar";
import HealthScoreChart from "../components/HealthScoreChart";
import { generateHealthReport } from "../utils/generateHealthReport";


export default function Result({ result, onRetry }) {
  const { basicInfo, risk, riskFactors, recommendations, aiNote } = result;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-6 py-10">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-10 space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Your Health Assessment Report
          </h1>
          <p className="text-gray-600">
            A structured summary based on your inputs and health indicators.
          </p>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Health Details">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <p><strong>Age:</strong> {basicInfo.age} yrs</p>
            <p><strong>Height:</strong> {basicInfo.height} cm</p>
            <p><strong>Weight:</strong> {basicInfo.weight} kg</p>
            <p>
              <strong>BMI:</strong> {basicInfo.bmi} ({basicInfo.bmiCategory})
            </p>
          </div>
        </Section>

        {/* BMI */}
        <Section title="Body Mass Index (BMI)">
          <div className="bg-gray-100 rounded-xl p-6 space-y-4">
            <p className="text-gray-700">
              BMI is a general indicator of body fat based on height and weight.
            </p>

            <BmiProgressBar bmi={basicInfo.bmi} />

            <p className="text-sm text-gray-600">
              Category:{" "}
              <span className="font-semibold">
                {basicInfo.bmiCategory}
              </span>
            </p>
          </div>
        </Section>

        {/* RISK LEVEL */}
        <Section title="Overall Risk Level">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Badge label={`${risk.level} RISK`} level={risk.level} />
            <p className="text-gray-700">
              Risk Score: <strong>{risk.score}</strong>
            </p>
          </div>
        </Section>

        {/* HEALTH SCORE */}
        <Section title="Overall Health Score">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-xl">
            <HealthScoreChart score={100 - risk.score} />

            <div className="text-gray-700 space-y-2">
              <p>
                Your health score reflects lifestyle, habits, and overall
                health risk indicators.
              </p>
              <p className="text-sm text-gray-600">
                A higher score means better overall health and lower long-term
                risk.
              </p>
            </div>
          </div>
        </Section>

        {/* RISK FACTORS */}
        {riskFactors?.length > 0 && (
          <Section title="Key Contributing Factors">
            <ListBlock items={riskFactors} />
          </Section>
        )}

        {/* RECOMMENDATIONS */}
        <Section title="Personalized Recommendations">
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="font-semibold mb-3">Nutrition</h3>
              <ListBlock items={recommendations.nutrition} />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="font-semibold mb-3">Exercise</h3>
              <ListBlock items={recommendations.exercise} />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="font-semibold mb-3">Lifestyle</h3>
              <ListBlock items={recommendations.lifestyle} />
            </div>

          </div>
        </Section>

        {/* AI NOTE */}
        <Section title="AI Insight">
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl text-blue-900">
            {aiNote}
          </div>
        </Section>

        {/* FOOTER */}
        <div className="flex justify-between items-center pt-6 border-t">
          <p className="text-xs text-gray-400">
            This assessment is for informational purposes only and
            does not replace medical advice.
          </p>

        </div>


        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">

            <button
                onClick={() => generateHealthReport(result)}
                className="px-6 py-3 rounded-lg bg-green-600 text-white
                        hover:bg-green-700 transition"
            >
                Download PDF Report
            </button>

            <button
                onClick={onRetry}
                className="bg-blue-700 text-white px-6 py-3 rounded-lg border border-gray-300
                        text-gray-700 hover:bg-gray-100 transition"
            >
                Retake Assessment
            </button>

            </div>


      </div>
    </div>
  );
}
