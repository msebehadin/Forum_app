import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, MessageSquare, Star } from "lucide-react"
import Link from "next/link"

const HowItWorks = () => (
  <div className="max-w-6xl mx-auto px-4 py-12">
    <div className="hero-grid rounded-3xl p-8 lg:p-12 soft-shadow text-center mb-12">
      <p className="text-xs uppercase tracking-[0.3em] text-[#7b6f67] mb-3">
        Purpose of the platform
      </p>
      <h1 className="text-4xl font-semibold text-[#1f1a17] mb-4">
        Learn faster together
      </h1>
      <p className="text-lg text-[#5f564f] max-w-3xl mx-auto">
        Fostering collaborative learning among students by enabling them to ask
        questions, answer peers, and review responses. An interactive space
        where knowledge is shared, support is provided, and understanding is
        enhanced through discussion.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Authentication Card */}
      <Card className="border border-white/70 bg-white/80 hover:border-white transition-all duration-300 hover:shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-[#1f1a17]">
              User Authentication
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-[#5f564f] leading-relaxed">
            Students begin by creating an account to access all platform features. 
            This enables them to explore questions and answers, ask their own questions, 
            and collaborate by answering others' queries.
          </p>
          <div className="mt-4 pt-4 border-t border-white/60">
            <ul className="space-y-2 text-sm text-[#7b6f67]">
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
      <Card className="border border-white/70 bg-white/80 hover:border-white transition-all duration-300 hover:shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-2xl">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-[#1f1a17]">
              Q&A Features
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-[#5f564f] leading-relaxed">
            Once registered, students can post academic questions and browse existing ones. 
            Contribute by providing answers, offering insights, solutions, or guidance to 
            help peers overcome their challenges.
          </p>
          <div className="mt-4 pt-4 border-t border-white/60">
            <ul className="space-y-2 text-sm text-[#7b6f67]">
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
      <Card className="border border-white/70 bg-white/80 hover:border-white transition-all duration-300 hover:shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-2xl">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-[#1f1a17]">
              Review Answers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-[#5f564f] leading-relaxed">
            After reviewing answers, students can rate them to highlight the best responses. 
            This system improves overall quality and helps others identify the most helpful 
            contributions quickly.
          </p>
          <div className="mt-4 pt-4 border-t border-white/60">
            <ul className="space-y-2 text-sm text-[#7b6f67]">
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
      <div className="inline-block bg-white/80 rounded-3xl p-8 max-w-2xl border border-white/70 shadow-sm">
        <h3 className="text-2xl font-semibold text-[#1f1a17] mb-3">
          Ready to join the learning community?
        </h3>
        <p className="text-[#5f564f] mb-6">
          Start collaborating with students worldwide to enhance your learning journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
                    <button className="px-6 py-3 bg-[#1f6fe5] text-white font-semibold rounded-full hover:bg-[#1a5ec6] transition-colors">
            Sign Up Now
          </button>
          </Link>

          <button className="px-6 py-3 border border-[#d9d0c7] text-[#4f453f] font-semibold rounded-full hover:border-[#c9bfb6] hover:bg-white transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default HowItWorks
