import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, MessageSquare, Star } from "lucide-react"
import Link from "next/link"

const HowItWorks = () => (
  <div className="max-w-6xl mx-auto px-4 py-12">
    {/* Header Section */}
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Purpose of the Platform
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Fostering collaborative learning among students by enabling them to ask questions, 
        answer peers, and review responses. An interactive space where knowledge is shared, 
        support is provided, and understanding is enhanced through discussion.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Authentication Card */}
      <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              User Authentication
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            Students begin by creating an account to access all platform features. 
            This enables them to explore questions and answers, ask their own questions, 
            and collaborate by answering others' queries.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Secure account creation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Personalized dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Track your contributions</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Q&A Card */}
      <Card className="border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Q&A Features
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            Once registered, students can post academic questions and browse existing ones. 
            Contribute by providing answers, offering insights, solutions, or guidance to 
            help peers overcome their challenges.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Post questions on any topic</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Browse categorized questions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Rich text formatting</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Review Answers Card */}
      <Card className="border-2 border-amber-100 hover:border-amber-300 transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Review Answers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            After reviewing answers, students can rate them to highlight the best responses. 
            This system improves overall quality and helps others identify the most helpful 
            contributions quickly.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Star-based rating system</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Sort by top-rated answers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Helpful feedback loop</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

    </div>

    {/* CTA Section */}
    <div className="mt-16 text-center">
      <div className="inline-block bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 max-w-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Ready to join the learning community?
        </h3>
        <p className="text-gray-600 mb-6">
          Start collaborating with students worldwide to enhance your learning journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up Now
          </button>
          </Link>

          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default HowItWorks