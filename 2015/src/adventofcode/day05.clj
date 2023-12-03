(ns adventofcode.day05
  (:use [digest])
  (:require [clojure.string :as str]))
  
;; Start with the input
(def in (-> "resources/day05input" slurp str/split-lines))

(def vowel? (set "aeiou"))
(def naughtystring? (set ["ab" "cd" "pq" "xy"]))
(def not-nil? (complement nil?))

(defn tuples
  [string]
  (partition 2 1 (seq string)))

(defn pairs
  [tuples]
  (map #(apply str %) tuples))

(defn nice-a?
  "Returns whether a string is nice or not,
  for Part 1."
  [string]
  (let [letterpairs (-> string tuples pairs)]
    (and
      (empty? (filter naughtystring? letterpairs))
      (not (empty? (filter #(apply = %) letterpairs)))
      (> (count (filter vowel? string)) 2))))

(defn nice-b?
  "Returns whether a string is nice or not,
  for Part 2. Deliberately less efficient than
  nesting the filters, but nicely (IMHO) reflects
  the requirement bullet points."
  [string]
  (and
    (not-nil? (re-find #"(\w).(\1)" string))
    (not-nil? (re-find #"(\w\w).*?\1" string))))

(defn solve
  "..."
  [& args]
  (println

    ;; Part 1
    (count (filter true? (map nice-a? in)))

    ;; Part 2
    (count (filter true? (map nice-b? in)))

    ))
  
