(ns adventofcode.day16
  (:require [clojure.string :as str]))

(def analysis
  {:children 3
   :cats 7
   :samoyeds 2
   :pomeranians 3
   :akitas 0
   :vizslas 0
   :goldfish 5
   :trees 3
   :cars 2
   :perfumes 1})

(defn pairmap
  "Turns a pair of two strings, where the second
  is an int, to a map.
  E.g. ('capacity', '-3') -> {:capacity -3}"
  [[s1 s2]]
  {(keyword s1) (Integer. s2)})

(defn sue-attrs
  "Parse out the attrs of a given Aunt Sue, into a map."
  [sue]
  (into {} (map (comp pairmap rest) (re-seq #"(?:(\w+): (\d+))" sue))))

(defn exact-match?
  "Returns whether there's an exact match of values for
  the given attributes when compared to the analysis."
  [attrs analysis]
  (= (map analysis (keys attrs))
     (vals attrs)))

(defn range-match?
  "Returns whether there's a match of values for the
  given attributes, when compared to the analysis. Range 
  matches apply for cats & trees, and pomeranians & goldfish."
  [attrs analysis]
  (reduce (fn [match [attr value]]
            (let [analysis-value (analysis attr)
                  comparison (case attr
                               (:cats :trees) >
                               (:pomeranians :goldfish) <
                               =)]
              (and match (comparison value analysis-value))))
          true
          attrs))


(loop
  [sues (->> "resources/day16input" slurp str/split-lines)]
  (if (not (empty? sues))
    (let [attrs (sue-attrs (first sues))]

      (defn the-sue [sues] (first (str/split (first sues) #":")))

      ;; Part 1
      (if (exact-match? attrs analysis)
        (println "Part 1:" (the-sue sues)))

      ;; Part 2
      (if (range-match? attrs analysis)
        (println "Part 2:" (the-sue sues)))

      (recur (rest sues)))))




